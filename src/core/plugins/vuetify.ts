import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#09A2AB",
        accent: "#046369",
        dark: "#303030",
      },
    },
  },
});

export { vuetify };
