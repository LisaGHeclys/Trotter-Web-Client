type Responsive = {
  [key: number]: {
    items: number;
  };
};

const responsive: Responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 2 },
  1080: { items: 3 }
};

export default responsive;
