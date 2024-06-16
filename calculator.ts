document.addEventListener('DOMContentLoaded', function() {
    const carTypeSelect = document.getElementById('carType') as HTMLSelectElement;
    const carValueInput = document.getElementById('carValue') as HTMLInputElement;
    const carValueRange = document.getElementById('carValueRange') as HTMLInputElement;
    const leasePeriodSelect = document.getElementById('leasePeriod') as HTMLSelectElement;
    const downPaymentInput = document.getElementById('downPaymentInput') as HTMLInputElement;
    const downPaymentRange = document.getElementById('downPaymentRange') as HTMLInputElement;

    const totalLeasingCostOutput = document.getElementById('totalLeasingCost') as HTMLParagraphElement;
    const downPaymentPercentageOutput = document.getElementById('downPaymentPercentage') as HTMLParagraphElement;
    const monthlyInstallmentOutput = document.getElementById('monthlyInstallment') as HTMLParagraphElement;
    const interestRateOutput = document.getElementById('interestRate') as HTMLParagraphElement;

    // Initial output values
    carValueRange.value = carValueInput.value;
    downPaymentRange.value = downPaymentInput.value;

    // Event listeners
    carTypeSelect.addEventListener('change', calculateLeasing);
    carValueInput.addEventListener('input', function() {
        carValueRange.value = this.value;
        calculateLeasing();
    });
    carValueRange.addEventListener('input', function() {
        carValueInput.value = this.value;
        calculateLeasing();
    });
    leasePeriodSelect.addEventListener('change', calculateLeasing);
    downPaymentInput.addEventListener('input', function() {
        downPaymentRange.value = this.value;
        calculateLeasing();
    });
    downPaymentRange.addEventListener('input', function() {
        downPaymentInput.value = this.value;
        calculateLeasing();
    });

    function calculateLeasing() {
        const carValue = parseFloat(carValueInput.value);
        const leasePeriod = parseInt(leasePeriodSelect.value);
        const downPaymentPercent = parseInt(downPaymentRange.value);

        if (isNaN(carValue) || isNaN(leasePeriod) || isNaN(downPaymentPercent)) {
            return;
        }

        let interestRate = 0;
        if (carTypeSelect.value === 'new') {
            interestRate = 2.99;
        } else if (carTypeSelect.value === 'used') {
            interestRate = 3.7;
        }

        const downPayment = carValue * (downPaymentPercent / 100);
        const loanAmount = carValue - downPayment;
        const monthlyInterestRate = interestRate / 100 / 12;
        const monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriod)));
        const totalCost = (monthlyPayment * leasePeriod) + downPayment;

        // Update UI with calculated values
        totalLeasingCostOutput.textContent = `Total Leasing Cost: €${totalCost.toFixed(2)}`;
        downPaymentPercentageOutput.textContent = `Down Payment (${downPaymentPercent}%): €${downPayment.toFixed(2)}`;
        monthlyInstallmentOutput.textContent = `Monthly Installment: €${monthlyPayment.toFixed(2)}`;
        interestRateOutput.textContent = `Interest Rate: ${interestRate.toFixed(2)}%`;
    }

    // Initial calculation
    calculateLeasing();
});
