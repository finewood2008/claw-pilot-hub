
-- =============================================
-- DEVICES TABLE
-- =============================================
CREATE TABLE public.devices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  mac TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'offline')),
  type TEXT NOT NULL DEFAULT 'personal' CHECK (type IN ('personal', 'enterprise', 'test')),
  description TEXT DEFAULT '',
  ip TEXT DEFAULT '0.0.0.0',
  cpu NUMERIC DEFAULT 0,
  memory NUMERIC DEFAULT 0,
  disk NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own devices" ON public.devices FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own devices" ON public.devices FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own devices" ON public.devices FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own devices" ON public.devices FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- DEVICE CONFIG HISTORY
-- =============================================
CREATE TABLE public.device_config_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id UUID NOT NULL REFERENCES public.devices(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.device_config_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own config history" ON public.device_config_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own config history" ON public.device_config_history FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- INSTALLED SKILLS (links devices to skills)
-- =============================================
CREATE TABLE public.installed_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES public.devices(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  version TEXT NOT NULL DEFAULT '',
  config JSONB DEFAULT '{}',
  config_schema JSONB DEFAULT '[]',
  installed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(device_id, skill_id)
);

ALTER TABLE public.installed_skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own installed skills" ON public.installed_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own installed skills" ON public.installed_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own installed skills" ON public.installed_skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own installed skills" ON public.installed_skills FOR DELETE USING (auth.uid() = user_id);

-- =============================================
-- TRANSACTIONS
-- =============================================
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TIMESTAMPTZ NOT NULL DEFAULT now(),
  type TEXT NOT NULL CHECK (type IN ('api_call', 'skill_sub', 'recharge', 'other')),
  description TEXT NOT NULL DEFAULT '',
  amount NUMERIC NOT NULL DEFAULT 0,
  balance NUMERIC NOT NULL DEFAULT 0,
  device_id UUID REFERENCES public.devices(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'pending', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own transactions" ON public.transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================
-- BILLS
-- =============================================
CREATE TABLE public.bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  total NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'unpaid' CHECK (status IN ('paid', 'unpaid', 'overdue')),
  items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bills" ON public.bills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bills" ON public.bills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bills" ON public.bills FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- USER BALANCE & PLAN
-- =============================================
CREATE TABLE public.user_billing (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance NUMERIC NOT NULL DEFAULT 128.50,
  current_plan TEXT NOT NULL DEFAULT 'p2',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_billing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own billing" ON public.user_billing FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own billing" ON public.user_billing FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own billing" ON public.user_billing FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- ALERT SETTINGS
-- =============================================
CREATE TABLE public.alert_settings (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  balance_threshold NUMERIC NOT NULL DEFAULT 20,
  usage_threshold NUMERIC NOT NULL DEFAULT 80,
  notify_email BOOLEAN NOT NULL DEFAULT true,
  notify_sms BOOLEAN NOT NULL DEFAULT false,
  notify_in_app BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.alert_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alert settings" ON public.alert_settings FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own alert settings" ON public.alert_settings FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own alert settings" ON public.alert_settings FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- AUTO-CREATE user_billing & alert_settings ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user_billing()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_billing (id) VALUES (NEW.id);
  INSERT INTO public.alert_settings (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_billing
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_billing();

-- Timestamp triggers
CREATE TRIGGER update_user_billing_updated_at
  BEFORE UPDATE ON public.user_billing
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_alert_settings_updated_at
  BEFORE UPDATE ON public.alert_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
