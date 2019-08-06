<template>
  <div style="width: 218px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys="openKeys"
      mode="inline"
      :theme="theme"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from "./SubMenu";

export default {
  name: "SideMenu",
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  components: {
    "sub-menu": SubMenu
  },
  data() {
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      menuData,
      selectedKeys: [],
      openKeys: []
    };
  },
  methods: {
    getMenuData(routes) {
      const menuData = [];
      routes.forEach(item => {
        if (item.name && !item.hidden) {
          const newItem = { ...item };
          delete newItem.children;
          if (item.children && !item.hidden) {
            newItem.children = this.getMenuData(item.children);
          }
          menuData.push(newItem);
        } else if (!item.hidden && item.children) {
          menuData.push(...this.getMenuData(item.children));
        }
      });
      return menuData;
    }
  }
};
</script>
