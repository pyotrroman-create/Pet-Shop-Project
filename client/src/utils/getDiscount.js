const getDiscount = (price, discountPrice) => {
    if (!price || !discountPrice || discountPrice >= price) {
        return 0;
    }

    return Math.round(((price - discountPrice) / price) * 100);
};

export default getDiscount;
