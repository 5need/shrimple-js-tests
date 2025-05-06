const powTextArea = document.querySelector("#pow");
const testsTextArea = document.querySelector("#tests");
const testsOutput = document.querySelector("#mocha");
const runButton = document.querySelector("#run");

let pow = Function();
let tests = Function();

function runTests() {
  const powInput = powEditor.getValue();
  const powFunc = Function(powInput);
  const testsInput = testsEditor.getValue();
  const testsFunc = Function("return () => {" + testsInput + "}");

  pow = powFunc();
  tests = testsFunc();

  // reset mocha
  mocha.suite.suites.length = 0;
  testsOutput.innerHTML = "";
  tests();
  mocha.run();
}

// Create the editor for the pow function (just a fancy <textarea>)
const powEditor = ace.edit("pow");
powEditor.setTheme("ace/theme/monokai");
powEditor.setSession(
  ace.createEditSession(`// This function should return x to the power of n
// We'll test this function's edge cases in \`tests.js\`
window.pow = function (x, n) {
  // if (Math.round(n) != n) return NaN;
  // if (n < 0) return NaN;

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
};`),
);
powEditor.session.setMode("ace/mode/javascript");
powEditor.session.setTabSize(2);

// Create the editor for the tests (just a fancy <textarea>)
const testsEditor = ace.edit("tests");
testsEditor.setTheme("ace/theme/monokai");
testsEditor.setSession(
  ace.createEditSession(`// Here we \`describe\` a group of tests, in this case, our \`window.pow\` function.
// \`describe\` and \`it\` come from \`Mocha\`.
describe("Testing window.pow()", function () {
  it("1 ^ 3 = 1", function () {
    assert.equal(window.pow(1, 3), 1);
  });
  it("2 ^ 3 = 8", function () {
    assert.equal(window.pow(2, 3), 8);
  });
  it("negative n should result in NaN", function () {
    assert.isNaN(window.pow(2, -1));
  });
  it("non-integer n should result in NaN", function () {
    assert.isNaN(window.pow(2, 1.5));
  });
});`),
);
testsEditor.session.setMode("ace/mode/javascript");
testsEditor.session.setTabSize(2);

runButton.addEventListener("click", runTests);
runTests();
