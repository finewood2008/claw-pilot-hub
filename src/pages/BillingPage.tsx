import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useBillingStore, costByDevice, costBySkill, costTrend } from "@/stores/billingStore";
import { useDeviceStore } from "@/stores/deviceStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BillingOverview from "@/components/billing/BillingOverview";
import RechargePanel from "@/components/billing/RechargePanel";
import TransactionRecords from "@/components/billing/TransactionRecords";
import BillList from "@/components/billing/BillList";
import SubscriptionPlans from "@/components/billing/SubscriptionPlans";
import CostAnalytics from "@/components/billing/CostAnalytics";
import AlertSettings from "@/components/billing/AlertSettings";

const BillingPage = () => {
  const [tab, setTab] = useState("overview");

  return (
    <DashboardLayout>
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-foreground">充值与消费</h1>
          <p className="text-muted-foreground text-sm mt-1">管理账户余额、查看消费记录和订阅计划</p>
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex flex-wrap h-auto gap-1">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="recharge">充值</TabsTrigger>
            <TabsTrigger value="records">消费记录</TabsTrigger>
            <TabsTrigger value="bills">账单</TabsTrigger>
            <TabsTrigger value="plans">订阅计划</TabsTrigger>
            <TabsTrigger value="analytics">成本分析</TabsTrigger>
            <TabsTrigger value="alerts">告警设置</TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><BillingOverview onNavigate={setTab} /></TabsContent>
          <TabsContent value="recharge"><RechargePanel /></TabsContent>
          <TabsContent value="records"><TransactionRecords /></TabsContent>
          <TabsContent value="bills"><BillList /></TabsContent>
          <TabsContent value="plans"><SubscriptionPlans /></TabsContent>
          <TabsContent value="analytics"><CostAnalytics /></TabsContent>
          <TabsContent value="alerts"><AlertSettings /></TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
