import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      name: "user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout.vue"),
      redirect: "/user/login",
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
          redirect: "/dashboard/analysis",
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "./views/dashboard/analysis.vue")
            }
          ]
        },
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          redirect: "/form/basic-form",
          children: [
            {
              path: "/form/basic-form",
              name: "basicForm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/form/basicForm.vue")
            },
            {
              path: "/form/step-form",
              name: "stepForm",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/form/stepForm.vue"),
              children: [
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/step/info.vue")
                },
                {
                  path: "/form/step-form/confirm",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/step/confirm.vue")
                },
                {
                  path: "/form/step-form/result",
                  name: "info",
                  component: () =>
                    import(/* webpackChunkName: "form" */ "./views/form/step/result.vue")
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: Home
    }
  ]
});
