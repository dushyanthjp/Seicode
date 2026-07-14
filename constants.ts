
import { TokenType } from './types';

// Used for Syntax Highlighting reference if needed, though Lexer uses KEYWORDS_MAP
export const KEYWORDS: Record<string, TokenType> = {
  'Kaami': TokenType.KAAMI,
  'Vangu': TokenType.VANGU,
  'Ippo': TokenType.IPPO,
  'Illana': TokenType.ILLANA,
  'Varai': TokenType.VARAI,
  'Suthu': TokenType.SUTHU,
  'Vai': TokenType.VAI,
  'Sei': TokenType.SEI,
  'Thiruppi': TokenType.THIRUPPI,
  
  'Um': TokenType.LOGICAL_AND,
  'Alladhu': TokenType.LOGICAL_OR,
  'Alla': TokenType.LOGICAL_NOT,
  
  // OOP
  'Vaguppu': TokenType.VAGUPPU,
  'Pudhu': TokenType.PUDHU,
  'Idhu': TokenType.IDHU,

  // Control
  'Nirthu': TokenType.NIRTHU,
  'Adutha': TokenType.ADUTHA,
  'Mei': TokenType.MEI,
  'Poi': TokenType.POI
};

export const KEYWORDS_MAP: Record<string, TokenType> = {
  'Kaami': TokenType.KAAMI,
  'Vangu': TokenType.VANGU,
  'Ippo': TokenType.IPPO,
  'Illana': TokenType.ILLANA,
  'Varai': TokenType.VARAI,
  'Suthu': TokenType.SUTHU,
  'Vai': TokenType.VAI,
  'Sei': TokenType.SEI,
  'Thiruppi': TokenType.THIRUPPI,
  
  // Logical Keywords
  'Um': TokenType.LOGICAL_AND,
  'Alladhu': TokenType.LOGICAL_OR,
  'Alla': TokenType.LOGICAL_NOT,

  'Vaguppu': TokenType.VAGUPPU,
  'Pudhu': TokenType.PUDHU,
  'Idhu': TokenType.IDHU,
  'Nirthu': TokenType.NIRTHU,
  'Adutha': TokenType.ADUTHA,
  'Mei': TokenType.MEI,
  'Poi': TokenType.POI,
};


export const DOCS_CARDS = [
  {
    title: 'Vaguppu',
    tag: 'OOP',
    desc: 'Create classes and objects.',
    code: 'Vaguppu Person { \n  Vai name = "" \n}'
  },
  {
    title: 'Kaami',
    tag: 'Print',
    desc: 'Outputs text to the terminal.',
    code: 'Kaami "Hello World"'
  },
  {
    title: 'Seru',
    tag: 'Array',
    desc: 'Add items to an array.',
    code: 'Vai list = [1, 2]\nSeru(list, 3)'
  },
  {
    title: 'Varai',
    tag: 'Loop',
    desc: 'Loops while condition is true.',
    code: 'Varai i < 5 { \n  Kaami i \n}'
  },
  {
    title: 'Sei',
    tag: 'Function',
    desc: 'Defines a reusable function.',
    code: 'Sei add(a, b) { \n  Thiruppi a + b \n}'
  },
  {
    title: 'Vangu',
    tag: 'Input',
    desc: 'Gets input from the user.',
    code: 'Vai age = Vangu "Age?"'
  }
];

export const REFERENCE_CARDS = [
  { term: 'Kaami', desc: 'Print', snippet: 'Kaami "Text"' },
  { term: 'Vai', desc: 'Var', snippet: 'Vai x = 10' },
  { term: 'Ippo', desc: 'If', snippet: 'Ippo x > 0 { }' },
  { term: 'Vaguppu', desc: 'Class', snippet: 'Vaguppu Name { }' },
  { term: '&& / ||', desc: 'Logic', snippet: 'Ippo x && y' },
  { term: '!= / ==', desc: 'Compare', snippet: 'Ippo x != y' },
  { term: 'Seru', desc: 'Push', snippet: 'Seru(arr, val)' },
  { term: '[]', desc: 'Array', snippet: 'Vai arr = [1,2]' },
];

export const DEFAULT_CODE = ``;

export const EXAMPLE_PROGRAMS = [
  {
    name: "Factorial (Recursion)",
    code: `// Calculate Factorial using Recursion

Sei factorial(n) {
  // Base case
  Ippo n <= 1 {
    Thiruppi 1
  }
  // Recursive step
  Thiruppi n * factorial(n - 1)
}

Vai num = 5
Kaami "Calculating factorial of " + num + "..."
Vai result = factorial(num)
Kaami "Result: " + result`
  },
  {
    name: "Even or Odd Check",
    code: `// Check if numbers are Even (Irattai) or Odd (Ottrai)

Sei checkNumber(n) {
  Ippo n % 2 == 0 {
    Kaami n + " is Even"
  } Illana {
    Kaami n + " is Odd"
  }
}

// Test cases
checkNumber(10)
checkNumber(7)
checkNumber(1024)
checkNumber(33)`
  },
  {
    name: "Sum of Array",
    code: `// Calculate sum of numbers in a list

Vai list = [10, 25, 40, 100, 5]
Vai sum = 0
Vai i = 0

Kaami "List: " + list

// Loop through array
Varai i < Neelam(list) {
  sum += list[i] // Add to sum
  i += 1
}

Kaami "Total Sum: " + sum
Kaami "Average: " + (sum / Neelam(list))`
  },
  {
    name: "Bank Account (OOP)",
    code: `// Simple Bank Account System using Classes

Vaguppu Account {
  Vai balance = 0

  Sei uruvaaku(initialAmt) {
    Idhu.balance = initialAmt
    Kaami "Account created with: $" + initialAmt
  }

  Sei deposit(amount) {
    Idhu.balance += amount
    Kaami "Deposited: $" + amount + ". New Balance: $" + Idhu.balance
  }

  Sei withdraw(amount) {
    Ippo amount <= Idhu.balance {
      Idhu.balance -= amount
      Kaami "Withdrew: $" + amount + ". Remaining: $" + Idhu.balance
    } Illana {
      Kaami "Failed: Insufficient funds to withdraw $" + amount
    }
  }
}

// Usage
Vai myAcc = Pudhu Account(1000)
myAcc.deposit(500)
myAcc.withdraw(200)
myAcc.withdraw(2000) // Should fail`
  }
];
