document.addEventListener('DOMContentLoaded', function () {
    var carTypeSelect = document.getElementById('carType');
    var carValueInput = document.getElementById('carValue');
    var carValueRange = document.getElementById('carValueRange');
    var leasePeriodSelect = document.getElementById('leasePeriod');
    var downPaymentInput = document.getElementById('downPaymentInput');
    var downPaymentRange = document.getElementById('downPaymentRange');
    var totalLeasingCostOutput = document.getElementById('totalLeasingCost');
    var downPaymentPercentageOutput = document.getElementById('downPaymentPercentage');
    var monthlyInstallmentOutput = document.getElementById('monthlyInstallment');
    var interestRateOutput = document.getElementById('interestRate');
    // Initial output values
    carValueRange.value = carValueInput.value;
    downPaymentRange.value = downPaymentInput.value;
    // Event listeners
    carTypeSelect.addEventListener('change', calculateLeasing);
    carValueInput.addEventListener('input', function () {
        carValueRange.value = this.value;
        calculateLeasing();
    });
    carValueRange.addEventListener('input', function () {
        carValueInput.value = this.value;
        calculateLeasing();
    });
    leasePeriodSelect.addEventListener('change', calculateLeasing);
    downPaymentInput.addEventListener('input', function () {
        downPaymentRange.value = this.value;
        calculateLeasing();
    });
    downPaymentRange.addEventListener('input', function () {
        downPaymentInput.value = this.value;
        calculateLeasing();
    });
    function calculateLeasing() {
        var carValue = parseFloat(carValueInput.value);
        var leasePeriod = parseInt(leasePeriodSelect.value);
        var downPaymentPercent = parseInt(downPaymentRange.value);
        if (isNaN(carValue) || isNaN(leasePeriod) || isNaN(downPaymentPercent)) {
            return;
        }
        var interestRate = 0;
        if (carTypeSelect.value === 'new') {
            interestRate = 2.99;
        }
        else if (carTypeSelect.value === 'used') {
            interestRate = 3.7;
        }
        var downPayment = carValue * (downPaymentPercent / 100);
        var loanAmount = carValue - downPayment;
        var monthlyInterestRate = interestRate / 100 / 12;
        var monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod)));
        var totalCost = (monthlyPayment * leasePeriod) + downPayment;
        // Update UI with calculated values
        totalLeasingCostOutput.textContent = "Total Leasing Cost: \u20AC".concat(totalCost.toFixed(2));
        downPaymentPercentageOutput.textContent = "Down Payment (".concat(downPaymentPercent, "%): \u20AC").concat(downPayment.toFixed(2));
        monthlyInstallmentOutput.textContent = "Monthly Installment: \u20AC".concat(monthlyPayment.toFixed(2));
        interestRateOutput.textContent = "Interest Rate: ".concat(interestRate.toFixed(2), "%");
    }
    // Initial calculation
    calculateLeasing();
});
