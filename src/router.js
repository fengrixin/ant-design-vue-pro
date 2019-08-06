import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      name: "user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      redirect: "/user/login",
      hidden: true,
      children: [
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/register.vue")
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout.vue"),
      redirect: "/dashboard",
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: { render: h => h("router-view") },
          meta: { icon: "dashboard", title: "仪表盘" },
          redirect: "/dashboard/analysis",
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              meta: { title: "分析页" },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/dashboard/analysis.vue")
            }
          ]
        },
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          meta: { icon: "form", title: "表单" },
          redirect: "/form/basic-form",
          children: [
            {
              path: "/form/basic-form",
              name: "basicForm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/form/basicForm.vue"),
              meta: { title: "基础表单" }
            },
            {
              path: "/form/step-form",
              name: "stepForm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/form/stepForm.vue"),
              meta: { title: "分布表单" },
              children: [
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/step/info.vue"),
                  meta: { title: "表单内容" }
                },
                {
                  path: "/form/step-form/confirm",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/step/confirm.vue"),
                  meta: { title: "表单提交" }
                },
                {
                  path: "/form/step-form/result",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/step/result.vue"),
                  meta: { title: "表单结果" }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "/404",
      component: () => import(/* webpackChunkName: "404" */ "./views/404.vue"),
      hidden: true
    },
    { path: "*", redirect: "/404", hidden: true }
  ]
});

router.beforeEach((to, form, next) => {
  if (to.path != form.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
