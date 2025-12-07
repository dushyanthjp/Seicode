
import { Token, TokenType, Statement, Program, Expression, BlockStatement, IfStatement, VariableDeclaration, FunctionDeclaration, ExpressionStatement, Identifier, CallExpression, AssignmentExpression, MemberExpression, ArrayLiteral, BreakStatement, ContinueStatement, ClassDeclaration, NewExpression, UnaryExpression } from '../types';

export class Parser {
  private tokens: Token[];
  private current = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  public parse(): Program {
    const program: Program = {
      kind: 'Program',
      body: []
    };

    while (!this.isAtEnd()) {
      program.body.push(this.parseStatement());
    }

    return program;
  }

  private parseStatement(): Statement {
    const token = this.peek();

    switch (token.type) {
      case TokenType.VAI:
        return this.parseVariableDeclaration();
      case TokenType.SEI:
        return this.parseFunctionDeclaration();
      case TokenType.VAGUPPU:
        return this.parseClassDeclaration();
      case TokenType.KAAMI:
        return this.parsePrintStatement();
      case TokenType.IPPO:
        return this.parseIfStatement();
      case TokenType.VARAI:
        return this.parseWhileStatement();
      case TokenType.THIRUPPI:
        return this.parseReturnStatement();
      case TokenType.NIRTHU:
        return this.parseBreakStatement();
      case TokenType.ADUTHA:
        return this.parseContinueStatement();
      case TokenType.LBRACE:
        return this.parseBlockStatement();
      default:
        return this.parseExpressionStatement();
    }
  }

  private parseVariableDeclaration(): VariableDeclaration {
    this.consume(TokenType.VAI, 'Expected "Vai" to declare variable.');
    const identifier = this.consume(TokenType.IDENTIFIER, 'Expected variable name.').value;
    
    let value: Expression | null = null;
    if (this.match(TokenType.ASSIGN)) {
      value = this.parseExpression();
    }
    
    // Optional semicolon
    this.match(TokenType.SEMICOLON);

    return {
      kind: 'VariableDeclaration',
      identifier,
      value
    };
  }

  private parseClassDeclaration(): ClassDeclaration {
    this.consume(TokenType.VAGUPPU, 'Expected "Vaguppu" for class.');
    const name = this.consume(TokenType.IDENTIFIER, 'Expected class name.').value;
    this.consume(TokenType.LBRACE, 'Expected {');
    
    const methods: FunctionDeclaration[] = [];
    const properties: VariableDeclaration[] = [];

    while(!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      if (this.check(TokenType.SEI)) {
        methods.push(this.parseFunctionDeclaration());
      } else if (this.check(TokenType.VAI)) {
        properties.push(this.parseVariableDeclaration());
      } else {
        throw new Error("Only variables (Vai) and functions (Sei) allowed in Class.");
      }
    }

    this.consume(TokenType.RBRACE, 'Expected }');

    return {
      kind: 'ClassDeclaration',
      name,
      methods,
      properties
    };
  }

  private parseFunctionDeclaration(): FunctionDeclaration {
    this.consume(TokenType.SEI, 'Expected "Sei" for function.');
    const name = this.consume(TokenType.IDENTIFIER, 'Expected function name.').value;
    
    this.consume(TokenType.LPAREN, 'Expected ( after function name.');
    const params: string[] = [];
    if (!this.check(TokenType.RPAREN)) {
      do {
        params.push(this.consume(TokenType.IDENTIFIER, 'Expected parameter name.').value);
      } while (this.match(TokenType.COMMA));
    }
    this.consume(TokenType.RPAREN, 'Expected ) after parameters.');
    
    const body = this.parseBlockStatement().body;

    return {
      kind: 'FunctionDeclaration',
      name,
      params,
      body
    };
  }

  private parseBlockStatement(): BlockStatement {
    this.consume(TokenType.LBRACE, 'Expected {');
    const body: Statement[] = [];
    while (!this.check(TokenType.RBRACE) && !this.isAtEnd()) {
      body.push(this.parseStatement());
    }
    this.consume(TokenType.RBRACE, 'Expected }');
    return { kind: 'BlockStatement', body };
  }

  private parsePrintStatement(): Statement {
    this.consume(TokenType.KAAMI, 'Expected "Kaami"');
    const value = this.parseExpression();
    this.match(TokenType.SEMICOLON);
    
    const callExpr: CallExpression = {
      kind: 'CallExpression',
      callee: { kind: 'Identifier', symbol: 'print' } as Identifier,
      arguments: [value]
    };

    return {
      kind: 'ExpressionStatement',
      expression: callExpr
    };
  }

  private parseIfStatement(): IfStatement {
    this.consume(TokenType.IPPO, 'Expected "Ippo"');
    const condition = this.parseExpression();
    const consequent = this.parseBlockStatement();
    let alternate: Statement | undefined;

    if (this.match(TokenType.ILLANA)) {
        if (this.check(TokenType.IPPO)) {
            // else if pattern -> Illana Ippo
            alternate = this.parseIfStatement();
        } else {
            alternate = this.parseBlockStatement();
        }
    }

    return {
      kind: 'IfStatement',
      condition,
      consequent,
      alternate
    };
  }

  private parseWhileStatement(): Statement {
    this.consume(TokenType.VARAI, 'Expected "Varai"');
    const condition = this.parseExpression();
    const body = this.parseBlockStatement();
    return {
      kind: 'WhileStatement',
      condition,
      body
    };
  }

  private parseBreakStatement(): BreakStatement {
    this.consume(TokenType.NIRTHU, 'Expected "Nirthu"');
    this.match(TokenType.SEMICOLON);
    return { kind: 'BreakStatement' };
  }

  private parseContinueStatement(): ContinueStatement {
    this.consume(TokenType.ADUTHA, 'Expected "Adutha"');
    this.match(TokenType.SEMICOLON);
    return { kind: 'ContinueStatement' };
  }

  private parseReturnStatement(): Statement {
    this.consume(TokenType.THIRUPPI, 'Expected "Thiruppi"');
    let argument;
    if (!this.check(TokenType.SEMICOLON)) {
      argument = this.parseExpression();
    }
    this.match(TokenType.SEMICOLON);
    return { kind: 'ReturnStatement', argument };
  }

  private parseExpressionStatement(): Statement {
    const expr = this.parseExpression();
    this.match(TokenType.SEMICOLON);
    return { kind: 'ExpressionStatement', expression: expr };
  }

  // Expression Parsing (Precedence)
  private parseExpression(): Expression {
    return this.parseAssignment();
  }

  private parseAssignment(): Expression {
    const left = this.parseLogicalOr();
    
    // Check for any assignment operator
    if (this.check(TokenType.ASSIGN) || 
        this.check(TokenType.PLUS_ASSIGN) || 
        this.check(TokenType.MINUS_ASSIGN) || 
        this.check(TokenType.MUL_ASSIGN) || 
        this.check(TokenType.DIV_ASSIGN) || 
        this.check(TokenType.MOD_ASSIGN)) {
      
      const operator = this.advance().value;
      const value = this.parseAssignment();
      
      if (left.kind === 'Identifier' || left.kind === 'MemberExpression') {
        return {
          kind: 'AssignmentExpression',
          assignee: left,
          value,
          operator
        };
      }
      throw new Error('Invalid assignment target.');
    }
    return left;
  }

  private parseLogicalOr(): Expression {
    let left = this.parseLogicalAnd();
    while (this.match(TokenType.LOGICAL_OR)) { // OR (||)
      const operator = '||';
      const right = this.parseLogicalAnd();
      left = { kind: 'BinaryExpression', left, right, operator };
    }
    return left;
  }

  private parseLogicalAnd(): Expression {
    let left = this.parseEquality();
    while (this.match(TokenType.LOGICAL_AND)) { // AND (&&)
      const operator = '&&';
      const right = this.parseEquality();
      left = { kind: 'BinaryExpression', left, right, operator };
    }
    return left;
  }

  private parseEquality(): Expression {
    let left = this.parseRelational();
    while (this.check(TokenType.SAMAM) || this.check(TokenType.NOT_EQUAL)) {
      const operator = this.advance().value;
      const right = this.parseRelational();
      left = { kind: 'BinaryExpression', left, right, operator };
    }
    return left;
  }

  private parseRelational(): Expression {
    let left = this.parseAdditive();
    while (this.check(TokenType.KORAI) || this.check(TokenType.ATHIGAM) || 
           this.check(TokenType.LESS_EQUAL) || this.check(TokenType.GREATER_EQUAL)) {
      const operator = this.advance().value;
      const right = this.parseAdditive();
      left = { kind: 'BinaryExpression', left, right, operator };
    }
    return left;
  }

  private parseAdditive(): Expression {
    let left = this.parseMultiplicative();
    while (this.check(TokenType.KOOTU) || this.check(TokenType.KAZHI)) {
      const operator = this.advance().value;
      const right = this.parseMultiplicative();
      left = { kind: 'BinaryExpression', left, right, operator };
    }
    return left;
  }

  private parseMultiplicative(): Expression {
    let left = this.parseUnary();
    while (this.check(TokenType.PERUKKU) || this.check(TokenType.VAGU) || this.check(TokenType.MODULO)) {
      const operator = this.advance().value;
      const right = this.parseUnary();
      left = { kind: 'BinaryExpression', left, right, operator };
    }
    return left;
  }

  private parseUnary(): Expression {
    if (this.check(TokenType.LOGICAL_NOT) || this.check(TokenType.KAZHI)) {
        const operator = this.advance().value;
        const argument = this.parseUnary();
        return {
            kind: 'UnaryExpression',
            operator,
            argument
        } as UnaryExpression;
    }
    return this.parseCall();
  }

  private parseCall(): Expression {
    // Parse member access here too
    let expr = this.parseMember();
    
    while (true) {
      if (this.match(TokenType.LPAREN)) {
        const args: Expression[] = [];
        if (!this.check(TokenType.RPAREN)) {
          do {
            args.push(this.parseExpression());
          } while (this.match(TokenType.COMMA));
        }
        this.consume(TokenType.RPAREN, "Expected )");
        expr = {
          kind: 'CallExpression',
          callee: expr,
          arguments: args
        };
      } else {
        break;
      }
    }
    return expr;
  }

  private parseMember(): Expression {
    let object = this.parsePrimary();

    while (true) {
        if (this.match(TokenType.DOT)) {
            const property = this.consume(TokenType.IDENTIFIER, "Expected property name after .");
            object = {
                kind: 'MemberExpression',
                object,
                property: { kind: 'Identifier', symbol: property.value },
                computed: false
            } as MemberExpression;
        } else if (this.match(TokenType.LBRACKET)) {
            // Array Index Access
            const property = this.parseExpression();
            this.consume(TokenType.RBRACKET, "Expected ]");
            object = {
                kind: 'MemberExpression',
                object,
                property, // Use the expression as property
                computed: true
            } as MemberExpression; // Note: TypeScript type might need adjustment if using expression for property in AST for computed
        } else {
            break;
        }
    }
    
    return object;
  }

  private parsePrimary(): Expression {
    if (this.match(TokenType.NUMBER)) {
      return { kind: 'Literal', value: parseFloat(this.previous().value), raw: this.previous().value };
    }
    if (this.match(TokenType.STRING)) {
      return { kind: 'Literal', value: this.previous().value, raw: this.previous().value };
    }
    if (this.match(TokenType.IDENTIFIER)) {
      return { kind: 'Identifier', symbol: this.previous().value };
    }
    if (this.match(TokenType.IDHU)) {
      return { kind: 'ThisExpression' };
    }
    if (this.match(TokenType.PUDHU)) {
      const className = this.consume(TokenType.IDENTIFIER, "Expected class name.").value;
      this.consume(TokenType.LPAREN, "Expected (");
      const args: Expression[] = [];
      if (!this.check(TokenType.RPAREN)) {
        do {
          args.push(this.parseExpression());
        } while (this.match(TokenType.COMMA));
      }
      this.consume(TokenType.RPAREN, "Expected )");
      return { kind: 'NewExpression', className, arguments: args };
    }
    if (this.match(TokenType.VANGU)) {
       const prompt = this.match(TokenType.STRING) ? this.previous().value : "";
       return {
           kind: 'CallExpression',
           callee: { kind: 'Identifier', symbol: 'input'},
           arguments: [{ kind: 'Literal', value: prompt, raw: prompt}]
       }
    }
    if (this.match(TokenType.LPAREN)) {
      const expr = this.parseExpression();
      this.consume(TokenType.RPAREN, "Expected )");
      return expr;
    }
    if (this.match(TokenType.LBRACKET)) {
       const elements: Expression[] = [];
       if (!this.check(TokenType.RBRACKET)) {
          do {
            elements.push(this.parseExpression());
          } while (this.match(TokenType.COMMA));
       }
       this.consume(TokenType.RBRACKET, "Expected ]");
       return { kind: 'ArrayLiteral', elements };
    }

    throw new Error(`Unexpected token at line ${this.peek().line}: ${this.peek().value}`);
  }

  // Helpers
  private match(type: TokenType): boolean {
    if (this.check(type)) {
      this.advance();
      return true;
    }
    return false;
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private consume(type: TokenType, message: string): Token {
    if (this.check(type)) return this.advance();
    throw new Error(message + ` Found ${this.peek().value} at line ${this.peek().line}`);
  }
}
