import Vue from "vue";
import Router from "vue-router";
import Chart from './views/chart';
import auth from "./auth";
import Books from './views/books';
import Home from "./views/home";
import Profile from "./views/profile";
// import DisplayData from "./views/display-data";
import defaultLayout from "./layouts/side-nav-outer-toolbar";
import simpleLayout from "./layouts/single-card";
import get_sum_customer_invoice from './views/get_sum_customer_invoice';
import get_sum_customer_invoice_grid from './views/get_sum_customer_invoice_grid';
import get_stock_movements from './views/get_stock_movements';
import get_stock_movements_grid from './views/get_stock_movements_grid';
import Tabpanel from './views/tabpanel';
import get_items_list from './views/get_items_list';
import get_items_list_grid from './views/get_items_list_grid';
import get_bank_inquiry from './views/get_bank_inquiry';
import get_bank_inquiry_grid from './views/get_bank_inquiry_grid';
import get_customer_inquiry from './views/get_customer_inquiry';
import get_customer_inquiry_grid from './views/get_customer_inquiry_grid';
import get_customer_tafsil from './views/get_customer_tafsil';
import get_customer_tafsil_grid from './views/get_customer_tafsil_grid';
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Home
      }
    },
    {
      path: "/profile",
      name: "profile",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Profile
      }
    },
    {
      path: "/tabpanel",
      name: "Tabpanel",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Tabpanel
      }
    },
    // {
    //   path: "/display-data",
    //   name: "display-data",
    //   meta: { requiresAuth: true },
    //   components: {
    //     layout: defaultLayout,
    //     content: DisplayData
    //   }
    // },
    {
      path: "/chart",
      name: "chart",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Chart
      }
    },
    {
      path: "/books",
      name: "books",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Books
      }
    },
    {
      path: "/get_sum_customer_invoice_grid",
      name: "get_sum_customer_invoice_grid",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_sum_customer_invoice_grid
      }
    },
    {
      path: "/get_sum_customer_invoice",
      name: "get_sum_customer_invoice",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_sum_customer_invoice
      }
    },
    {
      path: "/get_stock_movements",
      name: "get_stock_movements",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_stock_movements
      }
    },
    {
      path: "/get_stock_movements_grid",
      name: "get_stock_movements_grid",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_stock_movements_grid
      }
    },
    {
      path: "/get_items_list",
      name: "get_items_list",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_items_list
      }
    },
    {
      path: "/get_items_list_grid",
      name: "get_items_list_grid",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_items_list_grid
      }
    },
   
     {
      path: "/get_bank_inquiry",
      name: "get_bank_inquiry",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_bank_inquiry
      }
    },
     {
      path: "/get_bank_inquiry_grid",
      name: "get_bank_inquiry_grid",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_bank_inquiry_grid
      }
    },
    {
      path: "/get_customer_inquiry",
      name: "get_customer_inquiry",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_customer_inquiry
      }
    },
    {
      path: "/get_customer_inquiry_grid",
      name: "get_customer_inquiry_grid",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_customer_inquiry_grid
      }
    },
    {
      path: "/get_customer_tafsil",
      name: "get_customer_tafsil",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_customer_tafsil
      }
    },
    {
      path: "/get_customer_tafsil_grid",
      name: "get_customer_tafsil_grid",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: get_customer_tafsil_grid
      }
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        // route level code-splitting
        // this generates a separate chunk (login.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/login-form")
      }
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "*",
      redirect: "/home"
    }
    
  ]
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.authenticated()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.authenticated()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
