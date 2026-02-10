import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useDeviceStore } from "@/stores/deviceStore";
import { useSkillStore } from "@/stores/skillStore";
import { useBillingStore } from "@/stores/billingStore";
import { seedDemoData } from "@/lib/seedData";

/**
 * Hook that initializes all store data from Supabase on first mount.
 * Seeds demo data for new users if they have no devices.
 */
export function useInitData() {
  const { isAuthenticated } = useAuth();
  const fetchDevices = useDeviceStore((s) => s.fetchDevices);
  const fetchInstalled = useSkillStore((s) => s.fetchInstalled);
  const fetchBilling = useBillingStore((s) => s.fetchBilling);
  const initialized = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || initialized.current) return;
    initialized.current = true;

    const init = async () => {
      // Seed demo data for new users (no-op if already has data)
      await seedDemoData();
      // Fetch all data in parallel
      await Promise.all([fetchDevices(), fetchInstalled(), fetchBilling()]);
    };
    init();
  }, [isAuthenticated, fetchDevices, fetchInstalled, fetchBilling]);
}
