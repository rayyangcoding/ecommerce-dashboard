import Vue from "vue";
import VueRouter from "vue-router";
import ScreenPage from "@/views/ScreenPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/screen",
  },
  {
    path: "/screen",
    component: ScreenPage,
  },
  // 以下为开发过程中使用的路由
  // {
  //   path: "/sellerpage",
  //   component: SellerPage,
  // },
  // {
  //   path: "/trendpage",
  //   component: TrendPage,
  // },
  // {
  //   path: "/mappage",
  //   component: MapPage,
  // },
  // {
  //   path: "/rankpage",
  //   component: RankPage,
  // },
  // {
  //   path: "/hotpage",
  //   component: HotPage,
  // },
  // {
  //   path: "/stockpage",
  //   component: StockPage,
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
