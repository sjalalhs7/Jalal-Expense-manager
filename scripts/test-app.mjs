import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync('index.html', 'utf8');
const script = html.match(/<script>([\\s\\S]*?)<\\/script>/i)?.[1];
assert.ok(script, 'application script must exist');
const names = ['validDate', 'validAmount', 'validExpense', 'validIncome', 'esc'];
const declarations = names.map(name => {
  const start = script.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `missing ${name}`);
  let depth = 0, opened = false, quote = null, escaped = false;
  for (let i = start; i < script.length; i++) {
    const ch = script[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (ch === '\\\\') escaped = true;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
    if (ch === '{') { depth++; opened = true; }
    if (ch === '}' && opened && --depth === 0) return script.slice(start, i + 1);
  }
  throw new Error(`could not extract ${name}`);
});
const context = { CATS: {Food:1,Transport:1,Medical:1,Bills:1,Shopping:1,Education:1,Rent:1,Family:1,Other:1} };
vm.createContext(context);
vm.runInContext(declarations.join('\n') + '\nglobalThis.rules={validDate,validAmount,validExpense,validIncome,esc};', context);
const r = context.rules;
const expense = {id:'e_1',name:'Groceries',category:'Food',amount:1250,date:'2026-11-24',note:'weekly'};
const income = {id:'i_1',name:'Salary',amount:50000,date:'2026-11-01'};
assert.equal(r.validDate('2024-02-29'), true);
assert.equal(r.validDate('2025-02-29'), false);
assert.equal(r.validDate('2026-13-01'), false);
assert.equal(r.validAmount(1), true);
assert.equal(r.validAmount(1.5), false);
assert.equal(r.validAmount(-1), false);
assert.equal(r.validAmount(1000000000001), false);
assert.equal(r.validExpense(expense), true);
assert.equal(r.validExpense({...expense,category:'Unknown'}), false);
assert.equal(r.validExpense({...expense,amount:0}), false);
assert.equal(r.validExpense({...expense,date:'not-a-date'}), false);
assert.equal(r.validIncome(income), true);
assert.equal(r.validIncome({...income,id:'bad id'}), false);
assert.equal(r.validIncome({...income,amount:1.25}), false);
assert.equal(r.esc('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;');
console.log('App rules passed: date validity, safe whole-rupee amounts, expense/income schemas and HTML escaping.');
