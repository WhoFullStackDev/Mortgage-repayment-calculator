document.querySelector("#form").addEventListener("submit", (e) => {
  // don't reload after click on submit button
  e.preventDefault();

  // Get all values
  const amount = document.querySelector("#amount").value;
  const year = document.querySelector("#year").value;
  const rate = document.querySelector("#rate").value;
  const type = document.querySelector('input[name="type"]:checked').value;

  // Reset the value of input fields
  const reset = document.getElementById("reset");
  reset.addEventListener("click", () => {
    document.querySelector("#amount").value = "";
    document.querySelector("#year").value = "";
    document.querySelector("#rate").value = "";

    // Reset the radio button selection
    const radioButtons = document.querySelectorAll('input[name="type"]');
    radioButtons.forEach((radio) => {
      if (radio.value === "repayments") {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });
  });

  // Check input values is not empty
  if (!amount || !year || !rate) {
    alert("Please enter all fields");
    return;
  }

  // empty previous element
  const parent = document.getElementById("result");
  parent.style.display = "block";
  parent.innerHTML = "";

  // create header text
  const head = document.createElement("h1");
  const headingText = document.createTextNode("Your results");
  head.appendChild(headingText);
  parent.appendChild(head);

  // create result box
  const div = document.createElement("div");
  div.classList.add("box");
  parent.appendChild(div);

  // calculate total monthly amount
  const MontyRate = rate / (12 * 100);
  const totalNumberOfPayments = year * 12;
  const MontyTotalAmount =
    (MontyRate * amount * Math.pow(1 + MontyRate, totalNumberOfPayments)) /
    (Math.pow(1 + MontyRate, totalNumberOfPayments) - 1);

  // check radio button value
  if (type === "repayments") {
    // create a paragraph
    const par = document.createElement("p");
    const parText = document.createTextNode("Your Monthly repayments");
    par.appendChild(parText);
    div.appendChild(par);

    // display the monthly amount
    const displayAmount = document.createElement("strong");
    displayAmount.style.fontSize = "30px";
    displayAmount.innerHTML = `₹ ${MontyTotalAmount.toFixed(2)}`;
    div.appendChild(displayAmount);

    // create a horizontal line
    const hr = document.createElement("hr");
    div.appendChild(hr);

    // create anther paragraph
    const p = document.createElement("p");
    const text = document.createTextNode("Total you'll repay over the terms");
    p.appendChild(text);
    div.appendChild(p);

    // calculate total repayment amount
    const totalRepay = MontyTotalAmount * totalNumberOfPayments;

    // display the amount
    const strong = document.createElement("strong");
    strong.style.fontSize = "20px";
    strong.style.paddingBottom = "20px";
    strong.innerHTML = `₹ ${totalRepay.toFixed(2)}`;
    div.appendChild(strong);
  } else {
    // calculate monthly interest rate and display this
    const monthlyInterest = (amount * rate) / 12 / 100;
    const monthlyPar = document.createElement("p");
    const monthlyParText = document.createTextNode("Your Monthly interest");
    monthlyPar.appendChild(monthlyParText);
    div.appendChild(monthlyPar);

    const monthlyStrong = document.createElement("strong");
    monthlyStrong.style.fontSize = "30px";
    monthlyStrong.innerHTML = `₹ ${monthlyInterest.toFixed(2)}`;
    div.appendChild(monthlyStrong);

    const monthlyHr = document.createElement("hr");
    div.appendChild(monthlyHr);

    // calculate total interest and display it
    const totalPaid = MontyTotalAmount * totalNumberOfPayments;
    const totalInterest = totalPaid - amount;
    const insPara = document.createElement("p");
    const insText = document.createTextNode(
      "Total you'll pay interest over the terms"
    );
    insPara.appendChild(insText);

    div.appendChild(insPara);

    const insStrong = document.createElement("strong");
    insStrong.style.fontSize = "20px";
    insStrong.innerHTML = `₹ ${totalInterest.toFixed(2)}`;
    div.appendChild(insStrong);
  }
});
