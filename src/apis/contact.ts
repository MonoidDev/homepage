export const mapContactBudgetToLabel = (v: number) => {
  if (v === 0) {
    return 'Budget';
  } else if (v < 2 / 3) {
    return `${Math.floor(v / (1 / 15))}M JPY`;
  } else {
    return `10M JPY~`;
  }
};

export const mapContactDeliveryToLabel = (v: number) => {
  if (v === 0) {
    return 'Delivery';
  } else if (v < 2 / 3) {
    return `${Math.floor(v / (1 / 9))} mo.`;
  } else {
    return `6 mo.~`;
  }
};
