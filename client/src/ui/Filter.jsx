import { useState } from "react";
import styles from "./Filter.module.css";

const sortOptions = [
    {
        value: "default",
        label: "by default",
    },
    {
        value: "newest",
        label: "newest",
    },
    {
        value: "price-high-low",
        label: "price: high-low",
    },
    {
        value: "price-low-high",
        label: "price: low-high",
    },
];

function Filter({
    priceFrom,
    priceTo,
    discountedOnly,
    sort,
    onPriceFromChange,
    onPriceToChange,
    onDiscountedChange,
    onSortChange,
}) {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const selectedSort =
        sortOptions.find((option) => option.value === sort) ||
        sortOptions[0];

    return (
        <div className={styles.filter}>

            <div className={styles.filter__price}>
                <span className={styles.filter__title}>
                    Price
                </span>

                <input
                    type="number"
                    placeholder="from"
                    value={priceFrom}
                    onChange={(event) =>
                        onPriceFromChange(event.target.value)
                    }
                    className={styles.filter__input}
                />

                <input
                    type="number"
                    placeholder="to"
                    value={priceTo}
                    onChange={(event) =>
                        onPriceToChange(event.target.value)
                    }
                    className={styles.filter__input}
                />
            </div>

            <label className={styles.filter__discount}>
                <span className={styles.filter__title}>
                    Discounted items
                </span>

                <input
                    type="checkbox"
                    checked={discountedOnly}
                    onChange={(event) =>
                        onDiscountedChange(event.target.checked)
                    }
                    className={styles.filter__checkboxInput}
                />

                <span
                    className={`${styles.filter__checkbox} ${discountedOnly
                        ? styles.filter__checkboxChecked
                        : ""
                        }`}
                >
                    {discountedOnly && (
                        <span className={styles.filter__checkmark} />
                    )}
                </span>
            </label>

            <div className={styles.filter__sort}>
                <span className={styles.filter__title}>
                    Sorted
                </span>

                <div className={styles.select}>
                    <button
                        type="button"
                        className={styles.select__button}
                        onClick={() =>
                            setIsSortOpen((prev) => !prev)
                        }
                    >
                        <span
                            className={
                                styles.select__selected
                            }
                        >
                            {selectedSort.label}
                        </span>

                        <span
                            className={`${styles.select__arrow} ${isSortOpen
                                ? styles.select__arrowOpen
                                : ""
                                }`}
                        />
                    </button>
                    {isSortOpen && (
                        <div className={styles.select__dropdown}>
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    className={`${styles.select__option} ${option.value === sort
                                        ? styles.select__optionActive
                                        : ""
                                        }`}
                                    onClick={() => {
                                        onSortChange(
                                            option.value
                                        );
                                        setIsSortOpen(false);
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Filter;