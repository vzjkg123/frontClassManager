<template>
  <GlobalFooter :links="links" :copyright="copyright"/>
</template>
<script>
export default {
  name: "MyFooter",

  data() {
    return {
      links: [
        {
          key: '帮助',
          title: '帮助',
          href: '',
          blankTarget: true
        },
        {
          key: 'github',
          icon: 'logo-github',
          href: 'https://666.ltcnb.top',
          blankTarget: true
        },
        {
          key: '条款',
          title: '条款',
          href: '',
          blankTarget: true
        }
      ],
      copyright: 'Copyright © 2022 LTC All Rights Reserved'
    }
  }
}
</script>
