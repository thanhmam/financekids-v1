export const lessonsData = [
  {
    id: 1,
    title: 'Tiền là gì?',
    description: 'Học cách nhận biết tiền và giá trị của nó.',
    icon: 'PiggyBank',
    content: [
      {
        type: 'concept',
        text: 'Tiền là thứ chúng ta dùng để đổi lấy những món đồ mình cần hoặc muốn, như đồ chơi, thức ăn, quần áo.',
        animation: 'animate-float',
      },
      {
        type: 'quiz',
        question: 'Để có tiền, người lớn thường làm gì?',
        options: [
          { text: 'Làm việc chăm chỉ', isCorrect: true },
          { text: 'Chờ tiền rơi từ trên trời xuống', isCorrect: false }
        ],
        reward: 5 // coins
      }
    ]
  },
  {
    id: 2,
    title: 'Cần hay Muốn?',
    description: 'Phân biệt giữa thứ con CẦN và thứ con MUỐN.',
    icon: 'ShoppingBag',
    content: [
      {
        type: 'concept',
        text: 'CẦN là những thứ giúp chúng ta sống (thức ăn, nước uống, nhà ở).\nMUỐN là những thứ làm chúng ta vui nhưng không có cũng không sao (đồ chơi mới, kẹo).',
        animation: 'animate-pop',
      },
      {
        type: 'ab-choice',
        question: 'Đâu là thứ con CẦN?',
        optionA: { text: 'Cơm', image: '🍚', isCorrect: true },
        optionB: { text: 'Kẹo mút', image: '🍭', isCorrect: false },
        reward: 5
      },
      {
        type: 'ab-choice',
        question: 'Đâu là thứ con MUỐN?',
        optionA: { text: 'Nước lọc', image: '💧', isCorrect: false },
        optionB: { text: 'Siêu nhân đồ chơi', image: '🦸‍♂️', isCorrect: true },
        reward: 5
      }
    ]
  },
  {
    id: 3,
    title: 'Đi siêu thị mini',
    description: 'Tập mua hàng và tính tiền thừa.',
    icon: 'Store',
    content: [
      {
        type: 'transaction',
        items: [
          { id: 'apple', name: 'Táo', price: 2, icon: '🍎' },
          { id: 'milk', name: 'Sữa', price: 5, icon: '🥛' },
          { id: 'toy', name: 'Đồ chơi', price: 10, icon: '🧸' }
        ]
      }
    ]
  }
];
