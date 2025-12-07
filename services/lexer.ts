
import { Token, TokenType } from '../types';
import { KEYWORDS_MAP } from '../constants';

export class Lexer {
  private source: string;
  private tokens: Token[] = [];
  private current = 0;
  private line = 1;

  constructor(source: string) {
    this.source = source;
  }

  tokenize(): Token[] {
    while (this.current < this.source.length) {
      const char = this.source[this.current];

      // Whitespace
      if (/\s/.test(char)) {
        if (char === '\n') this.line++;
        this.current++;
        continue;
      }

      // Comments
      if (char === '/' && this.source[this.current + 1] === '/') {
        while (this.source[this.current] !== '\n' && this.current < this.source.length) {
          this.current++;
        }
        continue;
      }

      // Symbols
      if (char === '{') { this.addToken(TokenType.LBRACE, '{'); continue; }
      if (char === '}') { this.addToken(TokenType.RBRACE, '}'); continue; }
      if (char === '(') { this.addToken(TokenType.LPAREN, '('); continue; }
      if (char === ')') { this.addToken(TokenType.RPAREN, ')'); continue; }
      if (char === '[') { this.addToken(TokenType.LBRACKET, '['); continue; }
      if (char === ']') { this.addToken(TokenType.RBRACKET, ']'); continue; }
      if (char === ',') { this.addToken(TokenType.COMMA, ','); continue; }
      if (char === ';') { this.addToken(TokenType.SEMICOLON, ';'); continue; }
      if (char === '.') { this.addToken(TokenType.DOT, '.'); continue; }

      // Operators
      
      // = and ==
      if (char === '=') {
        if (this.match('=')) {
          this.addToken(TokenType.SAMAM, '==');
        } else {
          this.addToken(TokenType.ASSIGN, '=');
        }
        continue;
      }

      // ! and !=
      if (char === '!') {
          if (this.match('=')) {
              this.addToken(TokenType.NOT_EQUAL, '!=');
          } else {
              this.addToken(TokenType.LOGICAL_NOT, '!');
          }
          continue;
      }

      // < and <=
      if (char === '<') {
          if (this.match('=')) {
              this.addToken(TokenType.LESS_EQUAL, '<=');
          } else {
              this.addToken(TokenType.KORAI, '<');
          }
          continue;
      }

      // > and >=
      if (char === '>') {
          if (this.match('=')) {
              this.addToken(TokenType.GREATER_EQUAL, '>=');
          } else {
              this.addToken(TokenType.ATHIGAM, '>');
          }
          continue;
      }

      // + and +=
      if (char === '+') {
          if (this.match('=')) {
              this.addToken(TokenType.PLUS_ASSIGN, '+=');
          } else {
              this.addToken(TokenType.KOOTU, '+');
          }
          continue;
      }

      // - and -=
      if (char === '-') {
          if (this.match('=')) {
              this.addToken(TokenType.MINUS_ASSIGN, '-=');
          } else {
              this.addToken(TokenType.KAZHI, '-');
          }
          continue;
      }

      // * and *=
      if (char === '*') {
          if (this.match('=')) {
              this.addToken(TokenType.MUL_ASSIGN, '*=');
          } else {
              this.addToken(TokenType.PERUKKU, '*');
          }
          continue;
      }

      // / and /=
      if (char === '/') {
          if (this.match('=')) {
              this.addToken(TokenType.DIV_ASSIGN, '/=');
          } else {
              this.addToken(TokenType.VAGU, '/');
          }
          continue;
      }

      // % and %=
      if (char === '%') {
          if (this.match('=')) {
              this.addToken(TokenType.MOD_ASSIGN, '%=');
          } else {
              this.addToken(TokenType.MODULO, '%');
          }
          continue;
      }

      // &&
      if (char === '&') {
          if (this.match('&')) {
              this.addToken(TokenType.LOGICAL_AND, '&&');
          } else {
              throw new Error(`Unexpected character '&' at line ${this.line}`);
          }
          continue;
      }

      // ||
      if (char === '|') {
          if (this.match('|')) {
              this.addToken(TokenType.LOGICAL_OR, '||');
          } else {
              throw new Error(`Unexpected character '|' at line ${this.line}`);
          }
          continue;
      }

      // Strings
      if (char === '"') {
        let value = '';
        this.current++;
        while (this.source[this.current] !== '"' && this.current < this.source.length) {
          value += this.source[this.current];
          this.current++;
        }
        this.current++; // closing quote
        this.tokens.push({ type: TokenType.STRING, value, line: this.line });
        continue;
      }

      // Numbers
      if (/[0-9]/.test(char)) {
        let value = '';
        while (/[0-9]/.test(this.source[this.current]) && this.current < this.source.length) {
          value += this.source[this.current];
          this.current++;
        }
        this.tokens.push({ type: TokenType.NUMBER, value, line: this.line });
        continue;
      }

      // Identifiers & Keywords
      if (/[a-zA-Z_]/.test(char)) {
        let value = '';
        while (/[a-zA-Z0-9_]/.test(this.source[this.current]) && this.current < this.source.length) {
          value += this.source[this.current];
          this.current++;
        }
        
        // Check if keyword
        const keywordType = KEYWORDS_MAP[value];
        if (keywordType !== undefined) {
            this.tokens.push({ type: keywordType, value, line: this.line });
        } else {
            this.tokens.push({ type: TokenType.IDENTIFIER, value, line: this.line });
        }
        continue;
      }

      throw new Error(`Unknown character '${char}' at line ${this.line}`);
    }

    this.tokens.push({ type: TokenType.EOF, value: 'EOF', line: this.line });
    return this.tokens;
  }

  private addToken(type: TokenType, value: string) {
    this.tokens.push({ type, value, line: this.line });
    this.current++;
  }

  private match(expected: string): boolean {
      if (this.current + 1 >= this.source.length) return false;
      if (this.source[this.current + 1] !== expected) return false;
      this.current++;
      return true;
  }
}
