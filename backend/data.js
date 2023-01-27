import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Mouad',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Twist Dining Table',
      slug: 'Twist-Dining-Table',
      category: 'House Fourniture',
      subCategory: 'Dining',
      image: '/assets/images/TwistDiningTable.jpg',
      price: 288,
      countInStock: 9,
      rating: 4.5,
      numReviews: 10,
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      // _id: '2',
      name: 'Optima High Back Chair',
      slug: 'Optima-High-Back-Chair',
      category: 'Office Fourniture',
      subCategory: 'Office Chair',
      image: '/assets/images/OptimaHighBackChair.jpg',
      price: 211,
      countInStock: 23,
      rating: 4.0,
      numReviews: 10,
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      // _id: '3',
      name: 'Broma Bed Side Table',
      slug: 'Broma-Bed-Side-Table',
      category: 'House Fourniture',
      subCategory: 'Bedroom',
      image: '/assets/images/BromaBedSideTable.jpg',
      price: 211,
      countInStock: 23,
      rating: 4.2,
      numReviews: 14,
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
    {
      // _id: '4',
      name: 'Developer Chair',
      slug: 'Developer-Chair',
      category: 'Office Fourniture',
      subCategory: 'Office Chair',
      image: '/assets/images/DeveloperChair.jpg',
      price: 211,
      countInStock: 0,
      rating: 4.8,
      numReviews: 10,
      description:
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    },
  ],
};

export default data;
