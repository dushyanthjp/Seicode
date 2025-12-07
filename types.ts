

export enum TokenType {
  // Keywords
  KAAMI, // Print
  VANGU, // Input
  IPPO, // If
  ILLANA, // Else
  VARAI, // While
  SUTHU, // For
  VAI, // Var
  SEI, // Function
  THIRUPPI, // Return
  
  // Logic (Unified)
  LOGICAL_AND, // Um, &&
  LOGICAL_OR, // Alladhu, ||
  LOGICAL_NOT, // Alla, !
  
  // OOP
  VAGUPPU, // Class
  PUDHU, // New
  IDHU, // This

  // Control
  NIRTHU, // Break
  ADUTHA, // Continue

  // Boolean Literals
  MEI, // True
  POI, // False

  // Operators
  SAMAM, // ==
  NOT_EQUAL, // !=
  KORAI, // <
  ATHIGAM, // >
  LESS_EQUAL, // <=
  GREATER_EQUAL, // >=
  
  KOOTU, // +
  KAZHI, // -
  PERUKKU, // *
  VAGU, // /
  MODULO, // %

  // Assignment
  ASSIGN, // =
  PLUS_ASSIGN, // +=
  MINUS_ASSIGN, // -=
  MUL_ASSIGN, // *=
  DIV_ASSIGN, // /=
  MOD_ASSIGN, // %=
  
  DOT, // .

  // Symbols
  LBRACE, // {
  RBRACE, // }
  LPAREN, // (
  RPAREN, // )
  LBRACKET, // [
  RBRACKET, // ]
  COMMA, // ,
  SEMICOLON, // ;

  // Literals
  IDENTIFIER,
  NUMBER,
  STRING,
  
  EOF
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
}

// AST Nodes
export type NodeType = 
  | 'Program' 
  | 'VariableDeclaration' 
  | 'FunctionDeclaration'
  | 'ClassDeclaration'
  | 'BlockStatement'
  | 'IfStatement'
  | 'WhileStatement'
  | 'ReturnStatement'
  | 'BreakStatement'
  | 'ContinueStatement'
  | 'ExpressionStatement'
  | 'AssignmentExpression'
  | 'BinaryExpression'
  | 'UnaryExpression'
  | 'CallExpression'
  | 'MemberExpression'
  | 'NewExpression'
  | 'Literal'
  | 'ArrayLiteral'
  | 'Identifier'
  | 'ThisExpression';

export interface BaseStatement {
  kind: NodeType;
}

export interface Program extends BaseStatement {
  kind: 'Program';
  body: Statement[];
}

export interface VariableDeclaration extends BaseStatement {
  kind: 'VariableDeclaration';
  identifier: string;
  value: Expression | null;
}

export interface FunctionDeclaration extends BaseStatement {
  kind: 'FunctionDeclaration';
  name: string;
  params: string[];
  body: Statement[];
}

export interface ClassDeclaration extends BaseStatement {
  kind: 'ClassDeclaration';
  name: string;
  methods: FunctionDeclaration[];
  properties: VariableDeclaration[];
}

export interface BlockStatement extends BaseStatement {
  kind: 'BlockStatement';
  body: Statement[];
}

export interface IfStatement extends BaseStatement {
  kind: 'IfStatement';
  condition: Expression;
  consequent: Statement;
  alternate?: Statement;
}

export interface WhileStatement extends BaseStatement {
  kind: 'WhileStatement';
  condition: Expression;
  body: Statement;
}

export interface ReturnStatement extends BaseStatement {
  kind: 'ReturnStatement';
  argument?: Expression;
}

export interface BreakStatement extends BaseStatement {
  kind: 'BreakStatement';
}

export interface ContinueStatement extends BaseStatement {
  kind: 'ContinueStatement';
}

export interface ExpressionStatement extends BaseStatement {
  kind: 'ExpressionStatement';
  expression: Expression;
}

export type Statement = 
  | Program 
  | VariableDeclaration 
  | FunctionDeclaration
  | ClassDeclaration
  | BlockStatement
  | IfStatement
  | WhileStatement
  | ReturnStatement
  | BreakStatement
  | ContinueStatement
  | ExpressionStatement;

export interface AssignmentExpression extends BaseStatement {
  kind: 'AssignmentExpression';
  assignee: Expression; 
  value: Expression;
  operator: string;
}

export interface BinaryExpression extends BaseStatement {
  kind: 'BinaryExpression';
  left: Expression;
  right: Expression;
  operator: string;
}

export interface UnaryExpression extends BaseStatement {
  kind: 'UnaryExpression';
  operator: string;
  argument: Expression;
}

export interface CallExpression extends BaseStatement {
  kind: 'CallExpression';
  callee: Expression;
  arguments: Expression[];
}

export interface MemberExpression extends BaseStatement {
  kind: 'MemberExpression';
  object: Expression;
  property: Identifier;
  computed: boolean;
}

export interface NewExpression extends BaseStatement {
  kind: 'NewExpression';
  className: string;
  arguments: Expression[];
}

export interface Literal extends BaseStatement {
  kind: 'Literal';
  value: any;
  raw: string;
}

export interface ArrayLiteral extends BaseStatement {
  kind: 'ArrayLiteral';
  elements: Expression[];
}

export interface Identifier extends BaseStatement {
  kind: 'Identifier';
  symbol: string;
}

export interface ThisExpression extends BaseStatement {
  kind: 'ThisExpression';
}

export type Expression = 
  | AssignmentExpression
  | BinaryExpression
  | UnaryExpression
  | CallExpression
  | MemberExpression
  | NewExpression
  | Literal
  | ArrayLiteral
  | Identifier
  | ThisExpression;

// Runtime Values
export type RuntimeVal = 
  | { type: 'null', value: null }
  | { type: 'number', value: number }
  | { type: 'boolean', value: boolean }
  | { type: 'string', value: string }
  | { type: 'array', elements: RuntimeVal[] }
  | { type: 'object', properties: Map<string, RuntimeVal> }
  | { type: 'native-fn', call: (args: RuntimeVal[], env: Environment) => Promise<RuntimeVal> }
  | { type: 'function', name: string, params: string[], body: Statement[], env: Environment }
  | { type: 'class', name: string, methods: Map<string, FunctionDeclaration>, properties: VariableDeclaration[], env: Environment }
  | { type: 'return', value: RuntimeVal }
  | { type: 'break' }
  | { type: 'continue' };

export interface Environment {
  parent?: Environment;
  variables: Map<string, RuntimeVal>;
}
