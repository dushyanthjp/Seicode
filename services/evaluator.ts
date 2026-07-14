
import { Statement, Program, Environment, RuntimeVal, FunctionDeclaration, Expression, ClassDeclaration, AssignmentExpression, ReturnStatement } from '../types';

export class Evaluator {
  private outputCallback: (text: string) => void;
  private inputCallback: (prompt: string) => Promise<string>;
  private opCount = 0;
  private MAX_OPS = 1000000; // Increased for DSA problems

  constructor(onOutput: (t: string) => void, onInput: (p: string) => Promise<string>) {
    this.outputCallback = onOutput;
    this.inputCallback = onInput;
  }

  public async evaluateProgram(program: Program) {
    const env: Environment = {
      variables: new Map(),
      parent: undefined
    };
    
    // --- NATIVE FUNCTIONS (Standard Lib) ---

    // Printing
    env.variables.set('print', {
        type: 'native-fn',
        call: async (args) => {
            const output = args.map(a => {
                if ('value' in a) return (a as any).value;
                if (a.type === 'array') return `[${a.elements.map(e => (e as any).value).join(', ')}]`;
                if (a.type === 'object') return `{Object}`;
                return 'fn()';
            }).join(' ');
            this.outputCallback(String(output));
            return { type: 'null', value: null };
        }
    });

    // Input
    env.variables.set('input', {
        type: 'native-fn',
        call: async (args) => {
            const promptText = args.length > 0 && 'value' in args[0] ? String((args[0] as any).value) : '';
            const res = await this.inputCallback(promptText);
            const num = parseFloat(res);
            if (!isNaN(num) && res.trim() !== '') return { type: 'number', value: num };
            return { type: 'string', value: res };
        }
    });

    // Array Lib
    env.variables.set('Seru', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'array') throw new Error("Seru expects an array as first arg");
       args[0].elements.push(args[1]);
       return args[0];
    }});
    env.variables.set('Edu', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'array') throw new Error("Edu expects an array");
       return args[0].elements.pop() || { type: 'null', value: null };
    }});
    env.variables.set('MudalEdu', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'array') throw new Error("MudalEdu expects an array");
       return args[0].elements.shift() || { type: 'null', value: null };
    }});
    env.variables.set('Thiruppu', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'array') throw new Error("Thiruppu expects an array");
       args[0].elements.reverse();
       return args[0];
    }});

    // String Lib
    env.variables.set('Periyadhaaku', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'string') throw new Error("Expects string");
       return { type: 'string', value: ((args[0] as any).value as string).toUpperCase() };
    }});
    env.variables.set('Siriyadhaaku', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'string') throw new Error("Expects string");
       return { type: 'string', value: ((args[0] as any).value as string).toLowerCase() };
    }});
    env.variables.set('Vettu', { type: 'native-fn', call: async (args) => {
       if (args[0].type !== 'string') throw new Error("Expects string");
       const s = (args[1] as any).value as number;
       const e = args.length > 2 ? (args[2] as any).value as number : undefined;
       return { type: 'string', value: ((args[0] as any).value as string).substring(s, e) };
    }});
    env.variables.set('Thedu', { type: 'native-fn', call: async (args) => {
        if (args[0].type !== 'string') throw new Error("Expects string");
        return { type: 'number', value: ((args[0] as any).value as string).indexOf((args[1] as any).value as string) };
    }});
    env.variables.set('Pirikku', { type: 'native-fn', call: async (args) => {
        if (args[0].type !== 'string') throw new Error("Expects string");
        const delimiter = args.length > 1 ? (args[1] as any).value : '';
        const parts = ((args[0] as any).value as string).split(delimiter);
        return { type: 'array', elements: parts.map(p => ({ type: 'string', value: p })) };
    }});

    // Common
    env.variables.set('Neelam', { type: 'native-fn', call: async (args) => {
       if (args[0].type === 'array') return { type: 'number', value: args[0].elements.length };
       if (args[0].type === 'string') return { type: 'number', value: ((args[0] as any).value as string).length };
       return { type: 'number', value: 0 };
    }});
    
    // Type Conversion
    env.variables.set('Enn', { type: 'native-fn', call: async (args) => {
        const val = parseFloat((args[0] as any).value);
        return { type: 'number', value: isNaN(val) ? 0 : val };
    }});
    env.variables.set('Eluthu', { type: 'native-fn', call: async (args) => {
        return { type: 'string', value: String((args[0] as any).value) };
    }});

    // Data Structures
    env.variables.set('Agaradhi', { type: 'native-fn', call: async () => {
        return { type: 'object', properties: new Map() };
    }});

    // Math Library
    env.variables.set('Math', { type: 'object', properties: new Map<string, RuntimeVal>([
        ['PI', { type: 'number', value: Math.PI }],
        ['Ver', { type: 'native-fn', call: async (args) => { // Sqrt
             return { type: 'number', value: Math.sqrt((args[0] as any).value) };
        }}],
        ['Mattam', { type: 'native-fn', call: async (args) => { // Floor
             return { type: 'number', value: Math.floor((args[0] as any).value) };
        }}],
        ['Ucham', { type: 'native-fn', call: async (args) => { // Max
             const vals = args.map(a => (a as any).value);
             return { type: 'number', value: Math.max(...vals) };
        }}],
        ['Matcham', { type: 'native-fn', call: async (args) => { // Min
             const vals = args.map(a => (a as any).value);
             return { type: 'number', value: Math.min(...vals) };
        }}],
        ['Abs', { type: 'native-fn', call: async (args) => {
             return { type: 'number', value: Math.abs((args[0] as any).value) };
        }}],
        ['Adikku', { type: 'native-fn', call: async (args) => { // Power
             return { type: 'number', value: Math.pow((args[0] as any).value, (args[1] as any).value) };
        }}]
    ])});

    this.opCount = 0;
    
    for (const stmt of program.body) {
      await this.evaluate(stmt, env);
    }
  }

  private async evaluate(node: Statement | Expression, env: Environment): Promise<RuntimeVal> {
    this.opCount++;
    if (this.opCount > this.MAX_OPS) throw new Error("Maximum execution limit reached (Possible Infinite loop?)");

    switch (node.kind) {
      case 'VariableDeclaration': {
        const decl = node as any;
        const val: RuntimeVal = decl.value ? await this.evaluate(decl.value, env) : { type: 'null', value: null };
        env.variables.set(decl.identifier, val);
        return val;
      }
      
      case 'ClassDeclaration': {
        const cls = node as ClassDeclaration;
        const methods = new Map<string, FunctionDeclaration>();
        cls.methods.forEach(m => methods.set(m.name, m));
        
        env.variables.set(cls.name, {
            type: 'class',
            name: cls.name,
            methods,
            properties: cls.properties,
            env
        });
        return { type: 'null', value: null };
      }

      case 'FunctionDeclaration': {
        const funcNode = node as FunctionDeclaration;
        const fnVal: RuntimeVal = {
          type: 'function',
          name: funcNode.name,
          params: funcNode.params,
          body: funcNode.body,
          env: env 
        };
        env.variables.set(funcNode.name, fnVal);
        return fnVal;
      }
      case 'ExpressionStatement':
        return await this.evaluate((node as any).expression, env);
      
      case 'AssignmentExpression': {
        const assign = node as AssignmentExpression;
        const val = await this.evaluate(assign.value, env);
        
        // Helper to perform assignment operation
        const performAssign = (current: RuntimeVal, newVal: RuntimeVal, op: string): RuntimeVal => {
             if (op === '=') return newVal;
             
             // Compound assignments
             const currVal = (current as any).value;
             const v = (newVal as any).value;
             
             if (op === '+=') {
                 if (current.type === 'string' || newVal.type === 'string') {
                     return { type: 'string', value: String(currVal) + String(v) };
                 }
                 return { type: 'number', value: Number(currVal) + Number(v) };
             }
             if (op === '-=') return { type: 'number', value: Number(currVal) - Number(v) };
             if (op === '*=') return { type: 'number', value: Number(currVal) * Number(v) };
             if (op === '/=') return { type: 'number', value: Number(currVal) / Number(v) };
             if (op === '%=') return { type: 'number', value: Number(currVal) % Number(v) };
             
             return newVal;
        };

        if (assign.assignee.kind === 'Identifier') {
           const name = assign.assignee.symbol;
           const current = this.resolveVar(name, env);
           const result = performAssign(current, val, assign.operator);
           this.assignVar(name, result, env);
           return result;
        } else if (assign.assignee.kind === 'MemberExpression') {
           const obj = await this.evaluate(assign.assignee.object, env);
           
           if (assign.assignee.computed) {
               // Computed Access (Array index or Object key)
               const propExpr = (assign.assignee as any).property;
               const propVal = await this.evaluate(propExpr, env);
               
               if (obj.type === 'array' && propVal.type === 'number') {
                   const index = propVal.value;
                   if (index < 0 || index >= obj.elements.length) throw new Error("Array index out of bounds");
                   const current = obj.elements[index];
                   const result = performAssign(current, val, assign.operator);
                   obj.elements[index] = result;
                   return result;
               }

               if (obj.type === 'object' && propVal.type === 'string') {
                   const key = propVal.value;
                   const current = obj.properties.get(key) || { type: 'null', value: null };
                   const result = performAssign(current, val, assign.operator);
                   obj.properties.set(key, result);
                   return result;
               }

           } else {
               // Dot Notation Object property
               if (obj.type === 'object') {
                  const propName = assign.assignee.property.symbol;
                  const current = obj.properties.get(propName) || { type: 'null', value: null };
                  const result = performAssign(current, val, assign.operator);
                  obj.properties.set(propName, result);
                  return result;
               }
           }
           throw new Error("Cannot assign to this target");
        }
        return val;
      }

      case 'BlockStatement': {
         const newEnv: Environment = { parent: env, variables: new Map() };
         let lastVal: RuntimeVal = { type: 'null', value: null };
         for (const stmt of (node as any).body) {
             const result = await this.evaluate(stmt, newEnv);
             
             // Propagate signals (Return, Break, Continue)
             if ((result as any).type === 'return' || (result as any).type === 'break' || (result as any).type === 'continue') {
                 return result;
             }
             lastVal = result;
         }
         return lastVal;
      }

      case 'ReturnStatement': {
          const ret = node as ReturnStatement;
          const val = ret.argument ? await this.evaluate(ret.argument, env) : { type: 'null', value: null };
          return { type: 'return', value: val } as any;
      }

      case 'BreakStatement': return { type: 'break' } as any;
      case 'ContinueStatement': return { type: 'continue' } as any;

      case 'IfStatement': {
          const ifNode = node as any;
          const condition = await this.evaluate(ifNode.condition, env);
          if ((condition as any).value) {
              return await this.evaluate(ifNode.consequent, env);
          } else if (ifNode.alternate) {
              return await this.evaluate(ifNode.alternate, env);
          }
          return { type: 'null', value: null };
      }

      case 'WhileStatement': {
          const whileNode = node as any;
          let lastVal: RuntimeVal = { type: 'null', value: null };
          while (true) {
              this.opCount++; // Safety check in loop
              if (this.opCount > this.MAX_OPS) throw new Error("Maximum execution limit reached (Infinite loop?)");

              const condition = await this.evaluate(whileNode.condition, env);
              if (!(condition as any).value) break;
              
              const result = await this.evaluate(whileNode.body, env);
              if ((result as any).type === 'break') break;
              if ((result as any).type === 'continue') continue;
              if ((result as any).type === 'return') return result;

              if ('value' in result) lastVal = result; 
          }
          return lastVal;
      }
      
      case 'CallExpression': {
         const call = node as any;
         
         // Special handling if callee is a MemberExpression (method call) to bind 'this'
         let caller: RuntimeVal;
         let instance: RuntimeVal | null = null;

         if (call.callee.kind === 'MemberExpression' && !call.callee.computed) {
             instance = await this.evaluate(call.callee.object, env);
             if (instance.type !== 'object') throw new Error("Method call on non-object");
             const methodName = call.callee.property.symbol;
             if (!instance.properties.has(methodName)) throw new Error(`Method ${methodName} not found`);
             caller = instance.properties.get(methodName)!;
         } else {
             caller = await this.evaluate(call.callee, env);
         }
         
         const args: RuntimeVal[] = [];
         for (const arg of call.arguments) {
             args.push(await this.evaluate(arg, env));
         }

         if (caller.type === 'native-fn') {
             return await (caller as any).call(args, env);
         }
         
         if (caller.type === 'function') {
             const fn = caller as any;
             const scope: Environment = { parent: fn.env, variables: new Map() };
             
             // Bind params
             for(let i=0; i<fn.params.length; i++) {
                 scope.variables.set(fn.params[i], args[i] || { type: 'null', value: null});
             }

             // Bind 'Idhu' (this) if it's a method call
             if (instance) {
                 scope.variables.set('Idhu', instance);
             }

             // Execute body
             let result: RuntimeVal = { type: 'null', value: null };
             for (const stmt of fn.body) {
                 result = await this.evaluate(stmt, scope);
                 
                 // Handle return signal from deep nesting
                 if ((result as any).type === 'return') {
                     return (result as any).value;
                 }
             }
             return { type: 'null', value: null };
         }
         throw new Error(`Cannot call non-function type: ${caller.type}`);
      }

      case 'NewExpression': {
        const expr = node as any;
        const classVal = this.resolveVar(expr.className, env);
        if (classVal.type !== 'class') throw new Error(`${expr.className} is not a class`);
        
        // Create instance
        const instance: RuntimeVal = { type: 'object', properties: new Map() };
        
        // Initialize properties
        for(const prop of classVal.properties) {
            instance.properties.set(prop.identifier, prop.value ? await this.evaluate(prop.value, env) : {type:'null', value:null});
        }
        
        // Bind methods
        classVal.methods.forEach((m: any, name: string) => {
            instance.properties.set(name, {
                type: 'function',
                name: m.name,
                params: m.params,
                body: m.body,
                env: classVal.env // Closure over class def
            });
        });

        // Call constructor 'uruvaaku'
        if (instance.properties.has('uruvaaku')) {
            const ctor = instance.properties.get('uruvaaku') as any;
            const scope: Environment = { parent: ctor.env, variables: new Map() };
            
            // Eval args
            const args: RuntimeVal[] = [];
            for (const arg of expr.arguments) args.push(await this.evaluate(arg, env));

            // Bind params & this
            for(let i=0; i<ctor.params.length; i++) {
                 scope.variables.set(ctor.params[i], args[i] || { type: 'null', value: null});
            }
            scope.variables.set('Idhu', instance);

            for (const stmt of ctor.body) await this.evaluate(stmt, scope);
        }

        return instance;
      }

      case 'MemberExpression': {
        const member = node as any;
        const obj = await this.evaluate(member.object, env);
        
        if (member.computed) {
             const indexVal = await this.evaluate(member.property, env);
             
             if (obj.type === 'array' && indexVal.type === 'number') {
                 if (indexVal.value < 0 || indexVal.value >= obj.elements.length) return { type: 'null', value: null };
                 return obj.elements[indexVal.value];
             }

             if (obj.type === 'object' && indexVal.type === 'string') {
                 if (obj.properties.has(indexVal.value)) {
                     return obj.properties.get(indexVal.value)!;
                 }
                 return { type: 'null', value: null };
             }

             throw new Error("Invalid member access");
        } else {
             if (obj.type !== 'object') throw new Error("Cannot access property of non-object");
             const prop = member.property.symbol;
             if (obj.properties.has(prop)) return obj.properties.get(prop)!;
             throw new Error(`Property ${prop} not found`);
        }
      }

      case 'ThisExpression': {
          return this.resolveVar('Idhu', env);
      }

      case 'UnaryExpression': {
          const unary = node as any;
          const val = await this.evaluate(unary.argument, env);
          
          if (unary.operator === '!') {
              return { type: 'boolean', value: !(val as any).value };
          }
          if (unary.operator === '-') {
              return { type: 'number', value: -(val as any).value };
          }
          return val;
      }

      case 'BinaryExpression': {
        const bin = node as any;
        const left = await this.evaluate(bin.left, env);
        const right = await this.evaluate(bin.right, env);
        
        const lVal = (left as any).value;
        const rVal = (right as any).value;

        switch (bin.operator) {
            case '+': 
              if (left.type === 'string' || right.type === 'string') {
                  return { type: 'string', value: String(lVal) + String(rVal) };
              }
              return { type: 'number', value: Number(lVal) + Number(rVal) };
            case '-': return { type: 'number', value: Number(lVal) - Number(rVal) };
            case '*': return { type: 'number', value: Number(lVal) * Number(rVal) };
            case '/': return { type: 'number', value: Number(lVal) / Number(rVal) };
            case '%': return { type: 'number', value: Number(lVal) % Number(rVal) };
            
            case '<': return { type: 'boolean', value: Number(lVal) < Number(rVal) };
            case '>': return { type: 'boolean', value: Number(lVal) > Number(rVal) };
            case '<=': return { type: 'boolean', value: Number(lVal) <= Number(rVal) };
            case '>=': return { type: 'boolean', value: Number(lVal) >= Number(rVal) };
            case '==': return { type: 'boolean', value: lVal === rVal };
            case '!=': return { type: 'boolean', value: lVal !== rVal };
            
            case '&&': return { type: 'boolean', value: Boolean(lVal) && Boolean(rVal) };
            case '||': return { type: 'boolean', value: Boolean(lVal) || Boolean(rVal) };

            default: throw new Error(`Unknown operator ${bin.operator}`);
        }
      }

      case 'Literal': {
        const val = (node as any).value;
        if (val === null) return { type: 'null', value: null };
        if (typeof val === 'boolean') return { type: 'boolean', value: val };
        if (typeof val === 'number') return { type: 'number', value: val };
        return { type: 'string', value: String(val) };
      }
      
      case 'ArrayLiteral': {
          const els: RuntimeVal[] = [];
          for (const el of (node as any).elements) {
              els.push(await this.evaluate(el, env));
          }
          return { type: 'array', elements: els };
      }

      case 'Identifier':
        return this.resolveVar((node as any).symbol, env);

      default:
        return { type: 'null', value: null };
    }
  }

  private resolveVar(name: string, env: Environment): RuntimeVal {
    if (env.variables.has(name)) return env.variables.get(name)!;
    if (env.parent) return this.resolveVar(name, env.parent);
    throw new Error(`Variable '${name}' not defined.`);
  }

  private assignVar(name: string, value: RuntimeVal, env: Environment) {
      if (env.variables.has(name)) {
          env.variables.set(name, value);
          return;
      }
      if (env.parent) {
          this.assignVar(name, value, env.parent);
          return;
      }
      throw new Error(`Variable '${name}' not defined. Use 'Vai' to declare it.`);
  }
}
