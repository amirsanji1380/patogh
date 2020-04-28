export default [
  {
    text: "خانه",
    path: "/home",
    icon: "home"
  },
  {
    text: "پروفایل کاربر",
    path: "/profile",
    icon:"user"
  },
  {
    text: "فروش",
    icon: "money",
    items: [
      {
        text: "انبار و کالا",
        path: "/get_items_list_grid"
      },
      {
        text: "انبار و کالا انعطاف پذیر",
        path: "/get_items_list"
      },
      {
        text: "جمع فروش مشتری",
        path: "/get_sum_customer_invoice_grid"
      },
      {
        text: "جمع فروش مشتری انعطاف پذیر",
        path: "/get_sum_customer_invoice"
      },
      {
        text: "استعلام تبادلات انعطاف پذیر",
        path: "/get_customer_inquiry"
      },
      {
        text: "استعلام تبادلات",
        path: "/get_customer_inquiry_grid"
      },
    
   
      {
        text: "	استعلام حساب خزانه",
        path: "/get_bank_inquiry"
      },
      {
        text: "	استعلام حساب تفضیل",
        path: "/get_customer_tafsil_grid"
      },
    
    ]
  },
  ];
