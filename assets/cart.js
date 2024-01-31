document
  .querySelectorAll(".cart-quantity-selector button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const input = button.parentElement.querySelector("input")
      const value = Number(input.value)
      const isPlus = button.classList.contains("plus")
      const key = button.closest(".cart-item").getAttribute("data-key")

      if (isPlus) {
        const newValue = value + 1
        input.value = newValue
        changeItemQuantity(key, newValue)
      } else if (value > 1) {
        const newValue = value - 1
        input.value = newValue
        changeItemQuantity(key, newValue)
      }
    })
  })

function changeItemQuantity(key, quantity) {
  axios
    .post("/cart/change.js", {
      id: key,
      quantity,
    })
    .then((res) => {
      const totalDiscount = res.data.total_discount
      const totalPrice = res.data.total_price
      const item = res.data.items.find((item) => item.key === key)
      const itemPrice = item.final_line_price

      document.querySelector("#total-discount").textContent = totalDiscount
      document.querySelector("#total_price").textContent = totalPrice
      document.querySelector(
        `[data-key="${key}"].line_item_price`
      ).textContent = itemPrice

      console.log(totalDiscount)
    })
}
