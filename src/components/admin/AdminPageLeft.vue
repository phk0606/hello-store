<template>
  <v-card class="mx-auto" max-width="400">
    <v-list-item class="indigo lighten-4">
      <v-list-item-content>
        <v-list-item-title class="text-subtitle-1">
          상품 관리
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list dense>
      <v-list-item-group>
        <router-link to="/admin/product-regist"
          ><v-subheader>상품 등록</v-subheader></router-link
        >
        <v-subheader>상품 리스트</v-subheader>
        <v-list-item to="/admin/product-list">
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>스타일 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>오픈 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-list dense>
      <v-list-item-group>
        <v-subheader>카테고리 관리</v-subheader>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>스타일 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-icon>mdi-menu-right</v-icon>

          <v-list-item-content>
            <v-list-item-title>오픈 숍</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'MyPageLeft',
  data: () => ({
    items: [
      { text: 'Outer', icon: 'mdi-clock' },
      { text: 'Top', icon: 'mdi-account' },
      { text: 'Bottom', icon: 'mdi-flag' },
      { text: 'Skirt', icon: 'mdi-flag' },
      { text: 'Dress', icon: 'mdi-flag' },
    ],
    items2: [
      {
        id: 1,
        name: 'Outer',
        children: [
          { id: 2, name: '가디건' },
          { id: 3, name: '자켓' },
          { id: 4, name: '점퍼' },
          { id: 5, name: '코트' },
        ],
      },
      {
        id: 6,
        name: '상의',
        children: [
          { id: 7, name: '니트' },
          { id: 8, name: '브라우스' },
          { id: 9, name: '셔츠' },
          { id: 10, name: '티' },
        ],
      },
      {
        id: 11,
        name: '하의',
        children: [
          { id: 12, name: '슬랙스' },
          { id: 13, name: '일자팬츠' },
          { id: 14, name: '데님팬츠' },
          { id: 15, name: '반바지' },
        ],
      },
      {
        id: 16,
        name: '스커트',
        children: [
          { id: 17, name: '미니스커트' },
          { id: 18, name: '롱스커트' },
          { id: 19, name: '맥시스커트' },
          { id: 20, name: 'A라인' },
        ],
      },
      {
        id: 21,
        name: '원피스',
        children: [
          { id: 22, name: '캐주얼원피스' },
          { id: 23, name: '정장원피스' },
          { id: 24, name: '니트원피스' },
          { id: 25, name: '청/데님원피스' },
        ],
      },
    ],
    model: 1,
  }),
};
</script>

<style></style>
