const theme = {
  chalk: {
    background: "#161522",
    titleColor: "#fff",
    // 左上角logo 的图标路径
    logoSrc: "logo_dark.png",
    // 切换主题按钮的图片路径
    themeSrc: "qiehuan_dark.png",
    // 页面顶部的边框图片
    headerBorderSrc: "header_border_dark.png",
  },
  vintage: {
    background: "#eeeeee",
    titleColor: "#000000",
    logoSrc: "logo_light2.png",
    themeSrc: "qiehuan_light.png",
    headerBorderSrc: "header_border_light.png",
  },
};

export function getThemeValue(themeName) {
  return theme[themeName];
}
