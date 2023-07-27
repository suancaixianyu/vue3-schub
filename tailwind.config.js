/** @type {import('tailwindcss').Config} */
module.exports = {
  themes: [
    {
      /** 自定义主题颜色 */
      mytheme: {
        primary: "#21597f",

        secondary: "#428206",

        accent: "#14ba88",

        neutral: "#1f1924",

        "base-100": "#f5f4f6",

        info: "#496ad4",

        success: "#2abb75",

        warning: "#947005",

        error: "#f2796e",
      },
    },
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: true, // 主题样式
    darkTheme: "dark", // 暗模式中包含的主题之一的名称
    base: true, // 基础样式
    styled: true, // 自动添加一些颜色
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
