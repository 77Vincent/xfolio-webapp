export default [
  {
    title: '你的目标是',
    name: 'purpose',
    type: 'radio',
    options: [
      {
        value: 1,
        intro: '为留学',
      },
      {
        value: 2,
        intro: '为学校课程',
      },
      {
        value: 3,
        intro: '为兴趣',
      },
    ],
  },
  {
    title: '你的专业',
    name: 'major',
    type: 'select',
    options: [
      {
        value: 1,
        intro: '服装设计',
      },
      {
        value: 2,
        intro: '面料改造',
      },
      {
        value: 3,
        intro: '珠宝设计',
      },
    ],
  },
  {
    title: '你目前的学历',
    name: 'education',
    type: 'radio',
    options: [
      {
        value: 1,
        intro: '初中',
      },
      {
        value: 2,
        intro: '高中',
      },
      {
        value: 3,
        intro: '本科',
      },
    ],
  },
  {
    title: '你预计的学习周期',
    name: 'duration',
    type: 'radio',
    options: [
      {
        value: 1,
        intro: '一个月',
      },
      {
        value: 2,
        intro: '三个月',
      },
      {
        value: 3,
        intro: '半年',
      },
      {
        value: 4,
        intro: '一年',
      },
    ],
  },
  {
    title: '你希望的上课方式',
    name: 'mode',
    type: 'radio',
    options: [
      {
        value: 1,
        intro: '在家',
      },
      {
        value: 2,
        intro: '公共场合',
      },
      {
        value: 3,
        intro: '线上',
      },
      {
        value: 4,
        intro: '由导师决定',
      },
    ],
  },
]
