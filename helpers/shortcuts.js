import { t } from "testcafe";

export async function clearTextInput(selector, text) {
    await t
        .selectText(selector)
        .pressKey('delete')
        .typeText(selector,text)    
}

export async function clearText(selector){
    await t
          .selectText(selector)
          .pressKey('delete')
}



