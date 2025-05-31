document.addEventListener('DOMContentLoaded', () => {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const insertCoinBtn = document.getElementById('insert-coin');
    const selectDrinkBtn = document.getElementById('select-drink');
    const resultDiv = document.getElementById('result');
    const explanationDiv = document.getElementById('explanation');
    const coinSlot = document.getElementById('coin-slot');
    const drinkOutput = document.getElementById('drink-output');

    let currentMode = 'black';
    let coinInserted = false;

    // 測試模式的說明文字
    const explanations = {
        black: {
            title: '黑盒測試',
            text: '你不知道販賣機內部怎麼運作，只管投入硬幣、按按鈕，看是否吐出正確的飲料。這就像測試者不了解軟體內部結構，只看功能是否符合預期，適合整合與系統測試。'
        },
        white: {
            title: '白盒測試',
            text: '你拆開販賣機，檢查每個零件和線路，確保硬幣辨識、飲料掉落等每一步都正確。這就像測試者了解軟體程式碼，檢查內部邏輯，常用於單元與整合測試。'
        },
        gray: {
            title: '灰盒測試',
            text: '你知道販賣機大致怎麼運作，但不細看每個零件，只檢查硬幣進去後，飲料是否正確掉落，同時注意是否有異常聲音。這就像測試者對系統有部分了解，結合黑白盒優點，提升產品品質。'
        }
    };

    // 切換測試模式
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentMode = button.getAttribute('data-mode');
            updateExplanation();
            resetSimulation();
        });
    });

    // 更新說明文字
    function updateExplanation() {
        const mode = explanations[currentMode];
        explanationDiv.innerHTML = `
            <h3>${mode.title}</h3>
            <p>${mode.text}</p>
        `;
    }

    // 重置模擬狀態
    function resetSimulation() {
        coinInserted = false;
        resultDiv.textContent = '請投入硬幣並選擇飲料';
        coinSlot.textContent = '投幣口';
        drinkOutput.textContent = '飲料出口';
    }

    // 投入硬幣
    insertCoinBtn.addEventListener('click', () => {
        coinInserted = true;
        coinSlot.textContent = '已投入硬幣';
        if (currentMode === 'black') {
            resultDiv.textContent = '硬幣已投入，等待選擇飲料（無法看到內部運作）';
        } else if (currentMode === 'white') {
            resultDiv.textContent = '硬幣已投入，檢查硬幣辨識系統：硬幣有效！';
        } else if (currentMode === 'gray') {
            resultDiv.textContent = '硬幣已投入，確認硬幣進入系統，無異常聲音';
        }
    });

    // 選擇飲料
    selectDrinkBtn.addEventListener('click', () => {
        if (!coinInserted) {
            resultDiv.textContent = '請先投入硬幣！';
            return;
        }
        drinkOutput.textContent = '飲料已掉落';
        if (currentMode === 'black') {
            resultDiv.textContent = '飲料已掉落，測試結果：功能正常（僅觀察結果）';
        } else if (currentMode === 'white') {
            resultDiv.textContent = '飲料掉落系統檢查：齒輪運作正常，飲料掉落成功！';
        } else if (currentMode === 'gray') {
            resultDiv.textContent = '飲料掉落，測試結果：功能正常，無異常聲音';
        }
    });
});
