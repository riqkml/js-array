const productData = [
  {
    productId: 1000,
    productName: 'Product 1000'
  },
  {
    productId: 1001,
    productName: 'Product 1001'
  }
];
const stockData = [
  {
    productId: 1000,
    locationId: 1,
    stock: 21
  },
  {
    productId: 1000,
    locationId: 2,
    stock: 8
  },
  {
    productId: 1001,
    locationId: 1,
    stock: 4
  },
  {
    productId: 1001,
    locationId: 2,
    stock: 10
  }
]
const locationData = [
  {
    locationId: 1,
    locationName: 'Location 1'
  },
  {
    locationId: 2,
    locationName: 'Location 2'
  }
];
const temp = stockData.map(a =>
  Object.assign({},a,
      productData.find(b => b.productId === a.productId),
      locationData.find(c => c.locationId === a.locationId),
  )
)
const sums = [
  ...temp.reduce(
    (map, item) => {
      const { productId: key, stock } = item;
      const prev = map.get(key);
      
      if(prev) {
        prev.stock += stock
      } else {
        map.set(key, Object.assign({}, {
          productName: `Product ${key}`,
          stock: stock,
          detail: temp.filter(filt => filt.productId === item.productId).map(v =>  { return {stock: v.stock, locationName: v.locationName}})
        }))
      }
      return map
    },
    new Map()
  ).values()
]

console.log(sums)

