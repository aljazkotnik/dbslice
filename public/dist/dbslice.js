(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties$1(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass$1(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties$1(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized$1(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _unsupportedIterableToArray$1(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
  }

  function _arrayLikeToArray$1(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var id$1 = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id$1++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
  }

  // Arrays

  function unique$1(d) {
    // https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    } // unique


    return d.filter(onlyUnique);
  } // unique

  function arrayEqual(A, B) {
    return arrayIncludesAll(A, B) && arrayIncludesAll(B, A);
  } // arrayEqual

  function arrayIncludesAll(A, B) {
    // 'arrayIncludesAll' checks if array A includes all elements of array B. The elements of the arrays are expected to be strings.
    // Return element of B if it is not contained in A. If the response array has length 0 then A includes all elements of B, and 'true' is returned.
    var f = B.filter(function (b) {
      return !A.includes(b);
    });
    return f.length == 0 ? true : false;
  } // arrayIncludesAll
   // createFileInputElement

  var niceErrors = {
    0: "Invalid value for configuration 'enforceActions', expected 'never', 'always' or 'observed'",
    1: function _(annotationType, key) {
      return "Cannot apply '" + annotationType + "' to '" + key.toString() + "': Field not found.";
    },

    /*
    2(prop) {
        return `invalid decorator for '${prop.toString()}'`
    },
    3(prop) {
        return `Cannot decorate '${prop.toString()}': action can only be used on properties with a function value.`
    },
    4(prop) {
        return `Cannot decorate '${prop.toString()}': computed can only be used on getter properties.`
    },
    */
    5: "'keys()' can only be used on observable objects, arrays, sets and maps",
    6: "'values()' can only be used on observable objects, arrays, sets and maps",
    7: "'entries()' can only be used on observable objects, arrays and maps",
    8: "'set()' can only be used on observable objects, arrays and maps",
    9: "'remove()' can only be used on observable objects, arrays and maps",
    10: "'has()' can only be used on observable objects, arrays and maps",
    11: "'get()' can only be used on observable objects, arrays and maps",
    12: "Invalid annotation",
    13: "Dynamic observable objects cannot be frozen",
    14: "Intercept handlers should return nothing or a change object",
    15: "Observable arrays cannot be frozen",
    16: "Modification exception: the internal structure of an observable array was changed.",
    17: function _(index, length) {
      return "[mobx.array] Index out of bounds, " + index + " is larger than " + length;
    },
    18: "mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js",
    19: function _(other) {
      return "Cannot initialize from classes that inherit from Map: " + other.constructor.name;
    },
    20: function _(other) {
      return "Cannot initialize map from " + other;
    },
    21: function _(dataStructure) {
      return "Cannot convert to map from '" + dataStructure + "'";
    },
    22: "mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js",
    23: "It is not possible to get index atoms from arrays",
    24: function _(thing) {
      return "Cannot obtain administration from " + thing;
    },
    25: function _(property, name) {
      return "the entry '" + property + "' does not exist in the observable map '" + name + "'";
    },
    26: "please specify a property",
    27: function _(property, name) {
      return "no observable property '" + property.toString() + "' found on the observable object '" + name + "'";
    },
    28: function _(thing) {
      return "Cannot obtain atom from " + thing;
    },
    29: "Expecting some object",
    30: "invalid action stack. did you forget to finish an action?",
    31: "missing option for computed: get",
    32: function _(name, derivation) {
      return "Cycle detected in computation " + name + ": " + derivation;
    },
    33: function _(name) {
      return "The setter of computed value '" + name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?";
    },
    34: function _(name) {
      return "[ComputedValue '" + name + "'] It is not possible to assign a new value to a computed value.";
    },
    35: "There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`",
    36: "isolateGlobalState should be called before MobX is running any reactions",
    37: function _(method) {
      return "[mobx] `observableArray." + method + "()` mutates the array in-place, which is not allowed inside a derivation. Use `array.slice()." + method + "()` instead";
    },
    38: "'ownKeys()' can only be used on observable objects",
    39: "'defineProperty()' can only be used on observable objects"
  };
  var errors = niceErrors ;
  function die(error) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    {
      var e = typeof error === "string" ? error : errors[error];
      if (typeof e === "function") e = e.apply(null, args);
      throw new Error("[MobX] " + e);
    }
  }

  var mockGlobal = {};
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }

    if (typeof window !== "undefined") {
      return window;
    }

    if (typeof global !== "undefined") {
      return global;
    }

    if (typeof self !== "undefined") {
      return self;
    }

    return mockGlobal;
  }

  var assign = Object.assign;
  var getDescriptor = Object.getOwnPropertyDescriptor;
  var defineProperty = Object.defineProperty;
  var objectPrototype = Object.prototype;
  var EMPTY_ARRAY = [];
  Object.freeze(EMPTY_ARRAY);
  var EMPTY_OBJECT = {};
  Object.freeze(EMPTY_OBJECT);
  var hasProxy = typeof Proxy !== "undefined";
  var plainObjectString = /*#__PURE__*/Object.toString();
  function assertProxies() {
    if (!hasProxy) {
      die("`Proxy` objects are not available in the current environment. Please configure MobX to enable a fallback implementation.`" );
    }
  }
  function warnAboutProxyRequirement(msg) {
    if (globalState.verifyProxies) {
      die("MobX is currently configured to be able to run in ES5 mode, but in ES5 MobX won't be able to " + msg);
    }
  }
  function getNextId() {
    return ++globalState.mobxGuid;
  }
  /**
   * Makes sure that the provided function is invoked at most once.
   */

  function once(func) {
    var invoked = false;
    return function () {
      if (invoked) return;
      invoked = true;
      return func.apply(this, arguments);
    };
  }
  var noop$1 = function noop() {};
  function isFunction(fn) {
    return typeof fn === "function";
  }
  function isStringish(value) {
    var t = typeof value;

    switch (t) {
      case "string":
      case "symbol":
      case "number":
        return true;
    }

    return false;
  }
  function isObject(value) {
    return value !== null && typeof value === "object";
  }
  function isPlainObject(value) {
    var _proto$constructor;

    if (!isObject(value)) return false;
    var proto = Object.getPrototypeOf(value);
    if (proto == null) return true;
    return ((_proto$constructor = proto.constructor) == null ? void 0 : _proto$constructor.toString()) === plainObjectString;
  } // https://stackoverflow.com/a/37865170

  function isGenerator(obj) {
    var constructor = obj == null ? void 0 : obj.constructor;
    if (!constructor) return false;
    if ("GeneratorFunction" === constructor.name || "GeneratorFunction" === constructor.displayName) return true;
    return false;
  }
  function addHiddenProp(object, propName, value) {
    defineProperty(object, propName, {
      enumerable: false,
      writable: true,
      configurable: true,
      value: value
    });
  }
  function addHiddenFinalProp(object, propName, value) {
    defineProperty(object, propName, {
      enumerable: false,
      writable: false,
      configurable: true,
      value: value
    });
  }
  function createInstanceofPredicate(name, theClass) {
    var propName = "isMobX" + name;
    theClass.prototype[propName] = true;
    return function (x) {
      return isObject(x) && x[propName] === true;
    };
  }
  function isES6Map(thing) {
    return thing instanceof Map;
  }
  function isES6Set(thing) {
    return thing instanceof Set;
  }
  var hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== "undefined";
  /**
   * Returns the following: own enumerable keys and symbols.
   */

  function getPlainObjectKeys(object) {
    var keys = Object.keys(object); // Not supported in IE, so there are not going to be symbol props anyway...

    if (!hasGetOwnPropertySymbols) return keys;
    var symbols = Object.getOwnPropertySymbols(object);
    if (!symbols.length) return keys;
    return [].concat(keys, symbols.filter(function (s) {
      return objectPrototype.propertyIsEnumerable.call(object, s);
    }));
  } // From Immer utils
  // Returns all own keys, including non-enumerable and symbolic

  var ownKeys = typeof Reflect !== "undefined" && Reflect.ownKeys ? Reflect.ownKeys : hasGetOwnPropertySymbols ? function (obj) {
    return Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
  } :
  /* istanbul ignore next */
  Object.getOwnPropertyNames;
  function stringifyKey(key) {
    if (typeof key === "string") return key;
    if (typeof key === "symbol") return key.toString();
    return new String(key).toString();
  }
  function toPrimitive(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
  }
  function hasProp(target, prop) {
    return objectPrototype.hasOwnProperty.call(target, prop);
  } // From Immer utils

  var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(target) {
    // Polyfill needed for Hermes and IE, see https://github.com/facebook/hermes/issues/274
    var res = {}; // Note: without polyfill for ownKeys, symbols won't be picked up

    ownKeys(target).forEach(function (key) {
      res[key] = getDescriptor(target, key);
    });
    return res;
  };

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        return function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    it = o[Symbol.iterator]();
    return it.next.bind(it);
  }

  var storedAnnotationsSymbol = /*#__PURE__*/Symbol("mobx-stored-annotations");
  /**
   * Creates a function that acts as
   * - decorator
   * - annotation object
   */

  function createDecoratorAnnotation(annotation) {
    function decorator(target, property) {
      storeAnnotation(target, property, annotation);
    }

    return Object.assign(decorator, annotation);
  }
  /**
   * Stores annotation to prototype,
   * so it can be inspected later by `makeObservable` called from constructor
   */

  function storeAnnotation(prototype, key, annotation) {
    if (!hasProp(prototype, storedAnnotationsSymbol)) {
      addHiddenProp(prototype, storedAnnotationsSymbol, _extends({}, prototype[storedAnnotationsSymbol]));
    } // @override must override something


    if (isOverride(annotation) && !hasProp(prototype[storedAnnotationsSymbol], key)) {
      var fieldName = prototype.constructor.name + ".prototype." + key.toString();
      die("'" + fieldName + "' is decorated with 'override', " + "but no such decorated member was found on prototype.");
    } // Cannot re-decorate


    assertNotDecorated(prototype, annotation, key); // Ignore override

    if (!isOverride(annotation)) {
      prototype[storedAnnotationsSymbol][key] = annotation;
    }
  }

  function assertNotDecorated(prototype, annotation, key) {
    if (!isOverride(annotation) && hasProp(prototype[storedAnnotationsSymbol], key)) {
      var fieldName = prototype.constructor.name + ".prototype." + key.toString();
      var currentAnnotationType = prototype[storedAnnotationsSymbol][key].annotationType_;
      var requestedAnnotationType = annotation.annotationType_;
      die("Cannot apply '@" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already decorated with '@" + currentAnnotationType + "'.") + "\nRe-decorating fields is not allowed." + "\nUse '@override' decorator for methods overriden by subclass.");
    }
  }
  /**
   * Collects annotations from prototypes and stores them on target (instance)
   */


  function collectStoredAnnotations(target) {
    if (!hasProp(target, storedAnnotationsSymbol)) {
      if (!target[storedAnnotationsSymbol]) {
        die("No annotations were passed to makeObservable, but no decorated members have been found either");
      } // We need a copy as we will remove annotation from the list once it's applied.


      addHiddenProp(target, storedAnnotationsSymbol, _extends({}, target[storedAnnotationsSymbol]));
    }

    return target[storedAnnotationsSymbol];
  }

  var $mobx = /*#__PURE__*/Symbol("mobx administration");
  var Atom = /*#__PURE__*/function () {
    // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed

    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function Atom(name_) {
      if (name_ === void 0) {
        name_ = "Atom@" + getNextId() ;
      }

      this.name_ = void 0;
      this.isPendingUnobservation_ = false;
      this.isBeingObserved_ = false;
      this.observers_ = new Set();
      this.diffValue_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.NOT_TRACKING_;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      this.name_ = name_;
    } // onBecomeObservedListeners


    var _proto = Atom.prototype;

    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function (listener) {
          return listener();
        });
      }
    };

    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function (listener) {
          return listener();
        });
      }
    }
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     * Returns true if there is currently a reactive context.
     */
    ;

    _proto.reportObserved = function reportObserved$1() {
      return reportObserved(this);
    }
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    ;

    _proto.reportChanged = function reportChanged() {
      startBatch();
      propagateChanged(this);
      endBatch();
    };

    _proto.toString = function toString() {
      return this.name_;
    };

    return Atom;
  }();
  var isAtom = /*#__PURE__*/createInstanceofPredicate("Atom", Atom);
  function createAtom(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) {
      onBecomeObservedHandler = noop$1;
    }

    if (onBecomeUnobservedHandler === void 0) {
      onBecomeUnobservedHandler = noop$1;
    }

    var atom = new Atom(name); // default `noop` listener will not initialize the hook Set

    if (onBecomeObservedHandler !== noop$1) {
      onBecomeObserved(atom, onBecomeObservedHandler);
    }

    if (onBecomeUnobservedHandler !== noop$1) {
      onBecomeUnobserved(atom, onBecomeUnobservedHandler);
    }

    return atom;
  }

  function identityComparer(a, b) {
    return a === b;
  }

  function structuralComparer(a, b) {
    return deepEqual(a, b);
  }

  function shallowComparer(a, b) {
    return deepEqual(a, b, 1);
  }

  function defaultComparer(a, b) {
    return Object.is(a, b);
  }

  var comparer = {
    identity: identityComparer,
    structural: structuralComparer,
    "default": defaultComparer,
    shallow: shallowComparer
  };

  function deepEnhancer(v, _, name) {
    // it is an observable already, done
    if (isObservable(v)) return v; // something that can be converted and mutated?

    if (Array.isArray(v)) return observable.array(v, {
      name: name
    });
    if (isPlainObject(v)) return observable.object(v, undefined, {
      name: name
    });
    if (isES6Map(v)) return observable.map(v, {
      name: name
    });
    if (isES6Set(v)) return observable.set(v, {
      name: name
    });

    if (typeof v === "function" && !isAction(v) && !isFlow(v)) {
      if (isGenerator(v)) {
        return flow(v);
      } else {
        return autoAction(name, v);
      }
    }

    return v;
  }
  function shallowEnhancer(v, _, name) {
    if (v === undefined || v === null) return v;
    if (isObservableObject(v) || isObservableArray(v) || isObservableMap(v) || isObservableSet(v)) return v;
    if (Array.isArray(v)) return observable.array(v, {
      name: name,
      deep: false
    });
    if (isPlainObject(v)) return observable.object(v, undefined, {
      name: name,
      deep: false
    });
    if (isES6Map(v)) return observable.map(v, {
      name: name,
      deep: false
    });
    if (isES6Set(v)) return observable.set(v, {
      name: name,
      deep: false
    });
    die("The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
  function referenceEnhancer(newValue) {
    // never turn into an observable
    return newValue;
  }
  function refStructEnhancer(v, oldValue) {
    if (isObservable(v)) die("observable.struct should not be used with observable values");
    if (deepEqual(v, oldValue)) return oldValue;
    return v;
  }

  var OVERRIDE = "override";
  function isOverride(annotation) {
    return annotation.annotationType_ === OVERRIDE;
  }

  function createActionAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$1,
      extend_: extend_$1
    };
  }

  function make_$1(adm, key, descriptor, source) {
    var _this$options_;

    // bound
    if ((_this$options_ = this.options_) == null ? void 0 : _this$options_.bound) {
      return this.extend_(adm, key, descriptor, false) === null ? 0
      /* Cancel */
      : 1
      /* Break */
      ;
    } // own


    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0
      /* Cancel */
      : 2
      /* Continue */
      ;
    } // prototype


    if (isAction(descriptor.value)) {
      // A prototype could have been annotated already by other constructor,
      // rest of the proto chain must be annotated already
      return 1
      /* Break */
      ;
    }

    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor, false);
    defineProperty(source, key, actionDescriptor);
    return 2
    /* Continue */
    ;
  }

  function extend_$1(adm, key, descriptor, proxyTrap) {
    var actionDescriptor = createActionDescriptor(adm, this, key, descriptor);
    return adm.defineProperty_(key, actionDescriptor, proxyTrap);
  }

  function assertActionDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var value = _ref2.value;

    if (!isFunction(value)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a function value."));
    }
  }

  function createActionDescriptor(adm, annotation, key, descriptor, // provides ability to disable safeDescriptors for prototypes
  safeDescriptors) {
    var _annotation$options_, _annotation$options_$, _annotation$options_2, _annotation$options_$2, _annotation$options_3;

    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }

    assertActionDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;

    if ((_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.bound) {
      var _adm$proxy_;

      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }

    return {
      value: createAction((_annotation$options_$ = (_annotation$options_2 = annotation.options_) == null ? void 0 : _annotation$options_2.name) != null ? _annotation$options_$ : key.toString(), value, (_annotation$options_$2 = (_annotation$options_3 = annotation.options_) == null ? void 0 : _annotation$options_3.autoAction) != null ? _annotation$options_$2 : false),
      // Non-configurable for classes
      // prevents accidental field redefinition in subclass
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
      enumerable: false,
      // Non-obsevable, therefore non-writable
      // Also prevents rewriting in subclass constructor
      writable: safeDescriptors ? false : true
    };
  }

  function createFlowAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$2,
      extend_: extend_$2
    };
  }

  function make_$2(adm, key, descriptor, source) {
    var _this$options_;

    // own
    if (source === adm.target_) {
      return this.extend_(adm, key, descriptor, false) === null ? 0
      /* Cancel */
      : 2
      /* Continue */
      ;
    } // prototype
    // bound - must annotate protos to support super.flow()


    if (((_this$options_ = this.options_) == null ? void 0 : _this$options_.bound) && !isFlow(adm.target_[key])) {
      if (this.extend_(adm, key, descriptor, false) === null) return 0
      /* Cancel */
      ;
    }

    if (isFlow(descriptor.value)) {
      // A prototype could have been annotated already by other constructor,
      // rest of the proto chain must be annotated already
      return 1
      /* Break */
      ;
    }

    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, false, false);
    defineProperty(source, key, flowDescriptor);
    return 2
    /* Continue */
    ;
  }

  function extend_$2(adm, key, descriptor, proxyTrap) {
    var _this$options_2;

    var flowDescriptor = createFlowDescriptor(adm, this, key, descriptor, (_this$options_2 = this.options_) == null ? void 0 : _this$options_2.bound);
    return adm.defineProperty_(key, flowDescriptor, proxyTrap);
  }

  function assertFlowDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var value = _ref2.value;

    if (!isFunction(value)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on properties with a generator function value."));
    }
  }

  function createFlowDescriptor(adm, annotation, key, descriptor, bound, // provides ability to disable safeDescriptors for prototypes
  safeDescriptors) {
    if (safeDescriptors === void 0) {
      safeDescriptors = globalState.safeDescriptors;
    }

    assertFlowDescriptor(adm, annotation, key, descriptor);
    var value = descriptor.value;

    if (bound) {
      var _adm$proxy_;

      value = value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }

    return {
      value: flow(value),
      // Non-configurable for classes
      // prevents accidental field redefinition in subclass
      configurable: safeDescriptors ? adm.isPlainObject_ : true,
      // https://github.com/mobxjs/mobx/pull/2641#issuecomment-737292058
      enumerable: false,
      // Non-obsevable, therefore non-writable
      // Also prevents rewriting in subclass constructor
      writable: safeDescriptors ? false : true
    };
  }

  function createComputedAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$3,
      extend_: extend_$3
    };
  }

  function make_$3(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0
    /* Cancel */
    : 1
    /* Break */
    ;
  }

  function extend_$3(adm, key, descriptor, proxyTrap) {
    assertComputedDescriptor(adm, this, key, descriptor);
    return adm.defineComputedProperty_(key, _extends({}, this.options_, {
      get: descriptor.get,
      set: descriptor.set
    }), proxyTrap);
  }

  function assertComputedDescriptor(adm, _ref, key, _ref2) {
    var annotationType_ = _ref.annotationType_;
    var get = _ref2.get;

    if (!get) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' can only be used on getter(+setter) properties."));
    }
  }

  function createObservableAnnotation(name, options) {
    return {
      annotationType_: name,
      options_: options,
      make_: make_$4,
      extend_: extend_$4
    };
  }

  function make_$4(adm, key, descriptor) {
    return this.extend_(adm, key, descriptor, false) === null ? 0
    /* Cancel */
    : 1
    /* Break */
    ;
  }

  function extend_$4(adm, key, descriptor, proxyTrap) {
    var _this$options_$enhanc, _this$options_;

    assertObservableDescriptor(adm, this, key, descriptor);
    return adm.defineObservableProperty_(key, descriptor.value, (_this$options_$enhanc = (_this$options_ = this.options_) == null ? void 0 : _this$options_.enhancer) != null ? _this$options_$enhanc : deepEnhancer, proxyTrap);
  }

  function assertObservableDescriptor(adm, _ref, key, descriptor) {
    var annotationType_ = _ref.annotationType_;

    if (!("value" in descriptor)) {
      die("Cannot apply '" + annotationType_ + "' to '" + adm.name_ + "." + key.toString() + "':" + ("\n'" + annotationType_ + "' cannot be used on getter/setter properties"));
    }
  }

  var AUTO = "true";
  var autoAnnotation = /*#__PURE__*/createAutoAnnotation();
  function createAutoAnnotation(options) {
    return {
      annotationType_: AUTO,
      options_: options,
      make_: make_$5,
      extend_: extend_$5
    };
  }

  function make_$5(adm, key, descriptor, source) {
    var _this$options_3, _this$options_4;

    // getter -> computed
    if (descriptor.get) {
      return computed.make_(adm, key, descriptor, source);
    } // lone setter -> action setter


    if (descriptor.set) {
      // TODO make action applicable to setter and delegate to action.make_
      var set = createAction(key.toString(), descriptor.set); // own

      if (source === adm.target_) {
        return adm.defineProperty_(key, {
          configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
          set: set
        }) === null ? 0
        /* Cancel */
        : 2
        /* Continue */
        ;
      } // proto


      defineProperty(source, key, {
        configurable: true,
        set: set
      });
      return 2
      /* Continue */
      ;
    } // function on proto -> autoAction/flow


    if (source !== adm.target_ && typeof descriptor.value === "function") {
      var _this$options_2;

      if (isGenerator(descriptor.value)) {
        var _this$options_;

        var flowAnnotation = ((_this$options_ = this.options_) == null ? void 0 : _this$options_.autoBind) ? flow.bound : flow;
        return flowAnnotation.make_(adm, key, descriptor, source);
      }

      var actionAnnotation = ((_this$options_2 = this.options_) == null ? void 0 : _this$options_2.autoBind) ? autoAction.bound : autoAction;
      return actionAnnotation.make_(adm, key, descriptor, source);
    } // other -> observable
    // Copy props from proto as well, see test:
    // "decorate should work with Object.create"


    var observableAnnotation = ((_this$options_3 = this.options_) == null ? void 0 : _this$options_3.deep) === false ? observable.ref : observable; // if function respect autoBind option

    if (typeof descriptor.value === "function" && ((_this$options_4 = this.options_) == null ? void 0 : _this$options_4.autoBind)) {
      var _adm$proxy_;

      descriptor.value = descriptor.value.bind((_adm$proxy_ = adm.proxy_) != null ? _adm$proxy_ : adm.target_);
    }

    return observableAnnotation.make_(adm, key, descriptor, source);
  }

  function extend_$5(adm, key, descriptor, proxyTrap) {
    var _this$options_5, _this$options_6;

    // getter -> computed
    if (descriptor.get) {
      return computed.extend_(adm, key, descriptor, proxyTrap);
    } // lone setter -> action setter


    if (descriptor.set) {
      // TODO make action applicable to setter and delegate to action.extend_
      return adm.defineProperty_(key, {
        configurable: globalState.safeDescriptors ? adm.isPlainObject_ : true,
        set: createAction(key.toString(), descriptor.set)
      }, proxyTrap);
    } // other -> observable
    // if function respect autoBind option


    if (typeof descriptor.value === "function" && ((_this$options_5 = this.options_) == null ? void 0 : _this$options_5.autoBind)) {
      var _adm$proxy_2;

      descriptor.value = descriptor.value.bind((_adm$proxy_2 = adm.proxy_) != null ? _adm$proxy_2 : adm.target_);
    }

    var observableAnnotation = ((_this$options_6 = this.options_) == null ? void 0 : _this$options_6.deep) === false ? observable.ref : observable;
    return observableAnnotation.extend_(adm, key, descriptor, proxyTrap);
  }

  // in the majority of cases

  var defaultCreateObservableOptions = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
  };
  Object.freeze(defaultCreateObservableOptions);
  function asCreateObservableOptions(thing) {
    return thing || defaultCreateObservableOptions;
  }
  var observableAnnotation = /*#__PURE__*/createObservableAnnotation("observable");
  var observableRefAnnotation = /*#__PURE__*/createObservableAnnotation("observable.ref", {
    enhancer: referenceEnhancer
  });
  var observableShallowAnnotation = /*#__PURE__*/createObservableAnnotation("observable.shallow", {
    enhancer: shallowEnhancer
  });
  var observableStructAnnotation = /*#__PURE__*/createObservableAnnotation("observable.struct", {
    enhancer: refStructEnhancer
  });
  var observableDecoratorAnnotation = /*#__PURE__*/createDecoratorAnnotation(observableAnnotation);
  function getEnhancerFromOptions(options) {
    return options.deep === true ? deepEnhancer : options.deep === false ? referenceEnhancer : getEnhancerFromAnnotation(options.defaultDecorator);
  }
  function getAnnotationFromOptions(options) {
    var _options$defaultDecor;

    return options ? (_options$defaultDecor = options.defaultDecorator) != null ? _options$defaultDecor : createAutoAnnotation(options) : undefined;
  }
  function getEnhancerFromAnnotation(annotation) {
    var _annotation$options_$, _annotation$options_;

    return !annotation ? deepEnhancer : (_annotation$options_$ = (_annotation$options_ = annotation.options_) == null ? void 0 : _annotation$options_.enhancer) != null ? _annotation$options_$ : deepEnhancer;
  }
  /**
   * Turns an object, array or function into a reactive structure.
   * @param v the value which should become observable.
   */

  function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (isStringish(arg2)) {
      storeAnnotation(v, arg2, observableAnnotation);
      return;
    } // already observable - ignore


    if (isObservable(v)) return v; // plain object

    if (isPlainObject(v)) return observable.object(v, arg2, arg3); // Array

    if (Array.isArray(v)) return observable.array(v, arg2); // Map

    if (isES6Map(v)) return observable.map(v, arg2); // Set

    if (isES6Set(v)) return observable.set(v, arg2); // other object - ignore

    if (typeof v === "object" && v !== null) return v; // anything else

    return observable.box(v, arg2);
  }

  Object.assign(createObservable, observableDecoratorAnnotation);
  var observableFactories = {
    box: function box(value, options) {
      var o = asCreateObservableOptions(options);
      return new ObservableValue(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function array(initialValues, options) {
      var o = asCreateObservableOptions(options);
      return (globalState.useProxies === false || o.proxy === false ? createLegacyArray : createObservableArray)(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function map(initialValues, options) {
      var o = asCreateObservableOptions(options);
      return new ObservableMap(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function set(initialValues, options) {
      var o = asCreateObservableOptions(options);
      return new ObservableSet(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function object(props, decorators, options) {
      return extendObservable(globalState.useProxies === false || (options == null ? void 0 : options.proxy) === false ? asObservableObject({}, options) : asDynamicObservableObject({}, options), props, decorators);
    },
    ref: /*#__PURE__*/createDecoratorAnnotation(observableRefAnnotation),
    shallow: /*#__PURE__*/createDecoratorAnnotation(observableShallowAnnotation),
    deep: observableDecoratorAnnotation,
    struct: /*#__PURE__*/createDecoratorAnnotation(observableStructAnnotation)
  }; // eslint-disable-next-line

  var observable = /*#__PURE__*/assign(createObservable, observableFactories);

  var COMPUTED = "computed";
  var COMPUTED_STRUCT = "computed.struct";
  var computedAnnotation = /*#__PURE__*/createComputedAnnotation(COMPUTED);
  var computedStructAnnotation = /*#__PURE__*/createComputedAnnotation(COMPUTED_STRUCT, {
    equals: comparer.structural
  });
  /**
   * Decorator for class properties: @computed get value() { return expr; }.
   * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
   */

  var computed = function computed(arg1, arg2) {
    if (isStringish(arg2)) {
      // @computed
      return storeAnnotation(arg1, arg2, computedAnnotation);
    }

    if (isPlainObject(arg1)) {
      // @computed({ options })
      return createDecoratorAnnotation(createComputedAnnotation(COMPUTED, arg1));
    } // computed(expr, options?)


    {
      if (!isFunction(arg1)) die("First argument to `computed` should be an expression.");
      if (isFunction(arg2)) die("A setter as second argument is no longer supported, use `{ set: fn }` option instead");
    }

    var opts = isPlainObject(arg2) ? arg2 : {};
    opts.get = arg1;
    opts.name || (opts.name = arg1.name || "");
    /* for generated name */

    return new ComputedValue(opts);
  };
  Object.assign(computed, computedAnnotation);
  computed.struct = /*#__PURE__*/createDecoratorAnnotation(computedStructAnnotation);

  var _getDescriptor$config, _getDescriptor;
  // mobx versions

  var currentActionId = 0;
  var nextActionId = 1;
  var isFunctionNameConfigurable = (_getDescriptor$config = (_getDescriptor = /*#__PURE__*/getDescriptor(function () {}, "name")) == null ? void 0 : _getDescriptor.configurable) != null ? _getDescriptor$config : false; // we can safely recycle this object

  var tmpNameDescriptor = {
    value: "action",
    configurable: true,
    writable: false,
    enumerable: false
  };
  function createAction(actionName, fn, autoAction, ref) {
    if (autoAction === void 0) {
      autoAction = false;
    }

    {
      if (!isFunction(fn)) die("`action` can only be invoked on functions");
      if (typeof actionName !== "string" || !actionName) die("actions should have valid names, got: '" + actionName + "'");
    }

    function res() {
      return executeAction(actionName, autoAction, fn, ref || this, arguments);
    }

    res.isMobxAction = true;

    if (isFunctionNameConfigurable) {
      tmpNameDescriptor.value = actionName;
      Object.defineProperty(res, "name", tmpNameDescriptor);
    }

    return res;
  }
  function executeAction(actionName, canRunAsDerivation, fn, scope, args) {
    var runInfo = _startAction(actionName, canRunAsDerivation, scope, args);

    try {
      return fn.apply(scope, args);
    } catch (err) {
      runInfo.error_ = err;
      throw err;
    } finally {
      _endAction(runInfo);
    }
  }
  function _startAction(actionName, canRunAsDerivation, // true for autoAction
  scope, args) {
    var notifySpy_ = isSpyEnabled() && !!actionName;
    var startTime_ = 0;

    if (notifySpy_) {
      startTime_ = Date.now();
      var flattenedArgs = args ? Array.from(args) : EMPTY_ARRAY;
      spyReportStart({
        type: ACTION,
        name: actionName,
        object: scope,
        arguments: flattenedArgs
      });
    }

    var prevDerivation_ = globalState.trackingDerivation;
    var runAsAction = !canRunAsDerivation || !prevDerivation_;
    startBatch();
    var prevAllowStateChanges_ = globalState.allowStateChanges; // by default preserve previous allow

    if (runAsAction) {
      untrackedStart();
      prevAllowStateChanges_ = allowStateChangesStart(true);
    }

    var prevAllowStateReads_ = allowStateReadsStart(true);
    var runInfo = {
      runAsAction_: runAsAction,
      prevDerivation_: prevDerivation_,
      prevAllowStateChanges_: prevAllowStateChanges_,
      prevAllowStateReads_: prevAllowStateReads_,
      notifySpy_: notifySpy_,
      startTime_: startTime_,
      actionId_: nextActionId++,
      parentActionId_: currentActionId
    };
    currentActionId = runInfo.actionId_;
    return runInfo;
  }
  function _endAction(runInfo) {
    if (currentActionId !== runInfo.actionId_) {
      die(30);
    }

    currentActionId = runInfo.parentActionId_;

    if (runInfo.error_ !== undefined) {
      globalState.suppressReactionErrors = true;
    }

    allowStateChangesEnd(runInfo.prevAllowStateChanges_);
    allowStateReadsEnd(runInfo.prevAllowStateReads_);
    endBatch();
    if (runInfo.runAsAction_) untrackedEnd(runInfo.prevDerivation_);

    if (runInfo.notifySpy_) {
      spyReportEnd({
        time: Date.now() - runInfo.startTime_
      });
    }

    globalState.suppressReactionErrors = false;
  }
  function allowStateChangesStart(allowStateChanges) {
    var prev = globalState.allowStateChanges;
    globalState.allowStateChanges = allowStateChanges;
    return prev;
  }
  function allowStateChangesEnd(prev) {
    globalState.allowStateChanges = prev;
  }

  var _Symbol$toPrimitive;
  var CREATE = "create";
  _Symbol$toPrimitive = Symbol.toPrimitive;
  var ObservableValue = /*#__PURE__*/function (_Atom) {
    _inheritsLoose(ObservableValue, _Atom);

    function ObservableValue(value, enhancer, name_, notifySpy, equals) {
      var _this;

      if (name_ === void 0) {
        name_ = "ObservableValue@" + getNextId() ;
      }

      if (notifySpy === void 0) {
        notifySpy = true;
      }

      if (equals === void 0) {
        equals = comparer["default"];
      }

      _this = _Atom.call(this, name_) || this;
      _this.enhancer = void 0;
      _this.name_ = void 0;
      _this.equals = void 0;
      _this.hasUnreportedChange_ = false;
      _this.interceptors_ = void 0;
      _this.changeListeners_ = void 0;
      _this.value_ = void 0;
      _this.dehancer = void 0;
      _this.enhancer = enhancer;
      _this.name_ = name_;
      _this.equals = equals;
      _this.value_ = enhancer(value, undefined, name_);

      if (notifySpy && isSpyEnabled()) {
        // only notify spy if this is a stand-alone observable
        spyReport({
          type: CREATE,
          object: _assertThisInitialized(_this),
          observableKind: "value",
          debugObjectName: _this.name_,
          newValue: "" + _this.value_
        });
      }

      return _this;
    }

    var _proto = ObservableValue.prototype;

    _proto.dehanceValue = function dehanceValue(value) {
      if (this.dehancer !== undefined) return this.dehancer(value);
      return value;
    };

    _proto.set = function set(newValue) {
      var oldValue = this.value_;
      newValue = this.prepareNewValue_(newValue);

      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();

        if (notifySpy) {
          spyReportStart({
            type: UPDATE,
            object: this,
            observableKind: "value",
            debugObjectName: this.name_,
            newValue: newValue,
            oldValue: oldValue
          });
        }

        this.setNewValue_(newValue);
        if (notifySpy) spyReportEnd();
      }
    };

    _proto.prepareNewValue_ = function prepareNewValue_(newValue) {
      checkIfStateModificationsAreAllowed(this);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this,
          type: UPDATE,
          newValue: newValue
        });
        if (!change) return globalState.UNCHANGED;
        newValue = change.newValue;
      } // apply modifier


      newValue = this.enhancer(newValue, this.value_, this.name_);
      return this.equals(this.value_, newValue) ? globalState.UNCHANGED : newValue;
    };

    _proto.setNewValue_ = function setNewValue_(newValue) {
      var oldValue = this.value_;
      this.value_ = newValue;
      this.reportChanged();

      if (hasListeners(this)) {
        notifyListeners(this, {
          type: UPDATE,
          object: this,
          newValue: newValue,
          oldValue: oldValue
        });
      }
    };

    _proto.get = function get() {
      this.reportObserved();
      return this.dehanceValue(this.value_);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately) listener({
        observableKind: "value",
        debugObjectName: this.name_,
        object: this,
        type: UPDATE,
        newValue: this.value_,
        oldValue: undefined
      });
      return registerListener(this, listener);
    };

    _proto.raw = function raw() {
      // used by MST ot get undehanced value
      return this.value_;
    };

    _proto.toJSON = function toJSON() {
      return this.get();
    };

    _proto.toString = function toString() {
      return this.name_ + "[" + this.value_ + "]";
    };

    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };

    _proto[_Symbol$toPrimitive] = function () {
      return this.valueOf();
    };

    return ObservableValue;
  }(Atom);

  var _Symbol$toPrimitive$1;
  /**
   * A node in the state dependency root that observes other nodes, and can be observed itself.
   *
   * ComputedValue will remember the result of the computation for the duration of the batch, or
   * while being observed.
   *
   * During this time it will recompute only when one of its direct dependencies changed,
   * but only when it is being accessed with `ComputedValue.get()`.
   *
   * Implementation description:
   * 1. First time it's being accessed it will compute and remember result
   *    give back remembered result until 2. happens
   * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
   * 3. When it's being accessed, recompute if any shallow dependency changed.
   *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
   *    go to step 2. either way
   *
   * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
   */

  _Symbol$toPrimitive$1 = Symbol.toPrimitive;
  var ComputedValue = /*#__PURE__*/function () {
    // nodes we are looking at. Our value depends on these nodes
    // during tracking it's an array with new observed observers
    // to check for cycles
    // N.B: unminified as it is used by MST

    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structuralComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce a new aggregated object and
     * don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    function ComputedValue(options) {
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.observing_ = [];
      this.newObserving_ = null;
      this.isBeingObserved_ = false;
      this.isPendingUnobservation_ = false;
      this.observers_ = new Set();
      this.diffValue_ = 0;
      this.runId_ = 0;
      this.lastAccessedBy_ = 0;
      this.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
      this.unboundDepsCount_ = 0;
      this.value_ = new CaughtException(null);
      this.name_ = void 0;
      this.triggeredBy_ = void 0;
      this.isComputing_ = false;
      this.isRunningSetter_ = false;
      this.derivation = void 0;
      this.setter_ = void 0;
      this.isTracing_ = TraceMode.NONE;
      this.scope_ = void 0;
      this.equals_ = void 0;
      this.requiresReaction_ = void 0;
      this.keepAlive_ = void 0;
      this.onBOL = void 0;
      this.onBUOL = void 0;
      if (!options.get) die(31);
      this.derivation = options.get;
      this.name_ = options.name || ("ComputedValue@" + getNextId() );

      if (options.set) {
        this.setter_ = createAction(this.name_ + "-setter" , options.set);
      }

      this.equals_ = options.equals || (options.compareStructural || options.struct ? comparer.structural : comparer["default"]);
      this.scope_ = options.context;
      this.requiresReaction_ = !!options.requiresReaction;
      this.keepAlive_ = !!options.keepAlive;
    }

    var _proto = ComputedValue.prototype;

    _proto.onBecomeStale_ = function onBecomeStale_() {
      propagateMaybeChanged(this);
    };

    _proto.onBO = function onBO() {
      if (this.onBOL) {
        this.onBOL.forEach(function (listener) {
          return listener();
        });
      }
    };

    _proto.onBUO = function onBUO() {
      if (this.onBUOL) {
        this.onBUOL.forEach(function (listener) {
          return listener();
        });
      }
    }
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    ;

    _proto.get = function get() {
      if (this.isComputing_) die(32, this.name_, this.derivation);

      if (globalState.inBatch === 0 && // !globalState.trackingDerivatpion &&
      this.observers_.size === 0 && !this.keepAlive_) {
        if (shouldCompute(this)) {
          this.warnAboutUntrackedRead_();
          startBatch(); // See perf test 'computed memoization'

          this.value_ = this.computeValue_(false);
          endBatch();
        }
      } else {
        reportObserved(this);

        if (shouldCompute(this)) {
          var prevTrackingContext = globalState.trackingContext;
          if (this.keepAlive_ && !prevTrackingContext) globalState.trackingContext = this;
          if (this.trackAndCompute()) propagateChangeConfirmed(this);
          globalState.trackingContext = prevTrackingContext;
        }
      }

      var result = this.value_;
      if (isCaughtException(result)) throw result.cause;
      return result;
    };

    _proto.set = function set(value) {
      if (this.setter_) {
        if (this.isRunningSetter_) die(33, this.name_);
        this.isRunningSetter_ = true;

        try {
          this.setter_.call(this.scope_, value);
        } finally {
          this.isRunningSetter_ = false;
        }
      } else die(34, this.name_);
    };

    _proto.trackAndCompute = function trackAndCompute() {
      // N.B: unminified as it is used by MST
      var oldValue = this.value_;
      var wasSuspended =
      /* see #1208 */
      this.dependenciesState_ === IDerivationState_.NOT_TRACKING_;
      var newValue = this.computeValue_(true);

      if (isSpyEnabled()) {
        spyReport({
          observableKind: "computed",
          debugObjectName: this.name_,
          object: this.scope_,
          type: "update",
          oldValue: this.value_,
          newValue: newValue
        });
      }

      var changed = wasSuspended || isCaughtException(oldValue) || isCaughtException(newValue) || !this.equals_(oldValue, newValue);

      if (changed) {
        this.value_ = newValue;
      }

      return changed;
    };

    _proto.computeValue_ = function computeValue_(track) {
      this.isComputing_ = true; // don't allow state changes during computation

      var prev = allowStateChangesStart(false);
      var res;

      if (track) {
        res = trackDerivedFunction(this, this.derivation, this.scope_);
      } else {
        if (globalState.disableErrorBoundaries === true) {
          res = this.derivation.call(this.scope_);
        } else {
          try {
            res = this.derivation.call(this.scope_);
          } catch (e) {
            res = new CaughtException(e);
          }
        }
      }

      allowStateChangesEnd(prev);
      this.isComputing_ = false;
      return res;
    };

    _proto.suspend_ = function suspend_() {
      if (!this.keepAlive_) {
        clearObserving(this);
        this.value_ = undefined; // don't hold on to computed value!
      }
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      var _this = this;

      var firstTime = true;
      var prevValue = undefined;
      return autorun(function () {
        // TODO: why is this in a different place than the spyReport() function? in all other observables it's called in the same place
        var newValue = _this.get();

        if (!firstTime || fireImmediately) {
          var prevU = untrackedStart();
          listener({
            observableKind: "computed",
            debugObjectName: _this.name_,
            type: UPDATE,
            object: _this,
            newValue: newValue,
            oldValue: prevValue
          });
          untrackedEnd(prevU);
        }

        firstTime = false;
        prevValue = newValue;
      });
    };

    _proto.warnAboutUntrackedRead_ = function warnAboutUntrackedRead_() {

      if (this.requiresReaction_ === true) {
        die("[mobx] Computed value " + this.name_ + " is read outside a reactive context");
      }

      if (this.isTracing_ !== TraceMode.NONE) {
        console.log("[mobx.trace] '" + this.name_ + "' is being read outside a reactive context. Doing a full recompute");
      }

      if (globalState.computedRequiresReaction) {
        console.warn("[mobx] Computed value " + this.name_ + " is being read outside a reactive context. Doing a full recompute");
      }
    };

    _proto.toString = function toString() {
      return this.name_ + "[" + this.derivation.toString() + "]";
    };

    _proto.valueOf = function valueOf() {
      return toPrimitive(this.get());
    };

    _proto[_Symbol$toPrimitive$1] = function () {
      return this.valueOf();
    };

    return ComputedValue;
  }();
  var isComputedValue = /*#__PURE__*/createInstanceofPredicate("ComputedValue", ComputedValue);

  var IDerivationState_;

  (function (IDerivationState_) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState_[IDerivationState_["NOT_TRACKING_"] = -1] = "NOT_TRACKING_"; // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast

    IDerivationState_[IDerivationState_["UP_TO_DATE_"] = 0] = "UP_TO_DATE_"; // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed

    IDerivationState_[IDerivationState_["POSSIBLY_STALE_"] = 1] = "POSSIBLY_STALE_"; // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.

    IDerivationState_[IDerivationState_["STALE_"] = 2] = "STALE_";
  })(IDerivationState_ || (IDerivationState_ = {}));

  var TraceMode;

  (function (TraceMode) {
    TraceMode[TraceMode["NONE"] = 0] = "NONE";
    TraceMode[TraceMode["LOG"] = 1] = "LOG";
    TraceMode[TraceMode["BREAK"] = 2] = "BREAK";
  })(TraceMode || (TraceMode = {}));

  var CaughtException = function CaughtException(cause) {
    this.cause = void 0;
    this.cause = cause; // Empty
  };
  function isCaughtException(e) {
    return e instanceof CaughtException;
  }
  /**
   * Finds out whether any dependency of the derivation has actually changed.
   * If dependenciesState is 1 then it will recalculate dependencies,
   * if any dependency changed it will propagate it by changing dependenciesState to 2.
   *
   * By iterating over the dependencies in the same order that they were reported and
   * stopping on the first change, all the recalculations are only called for ComputedValues
   * that will be tracked by derivation. That is because we assume that if the first x
   * dependencies of the derivation doesn't change then the derivation should run the same way
   * up until accessing x-th dependency.
   */

  function shouldCompute(derivation) {
    switch (derivation.dependenciesState_) {
      case IDerivationState_.UP_TO_DATE_:
        return false;

      case IDerivationState_.NOT_TRACKING_:
      case IDerivationState_.STALE_:
        return true;

      case IDerivationState_.POSSIBLY_STALE_:
        {
          // state propagation can occur outside of action/reactive context #2195
          var prevAllowStateReads = allowStateReadsStart(true);
          var prevUntracked = untrackedStart(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.

          var obs = derivation.observing_,
              l = obs.length;

          for (var i = 0; i < l; i++) {
            var obj = obs[i];

            if (isComputedValue(obj)) {
              if (globalState.disableErrorBoundaries) {
                obj.get();
              } else {
                try {
                  obj.get();
                } catch (e) {
                  // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                  untrackedEnd(prevUntracked);
                  allowStateReadsEnd(prevAllowStateReads);
                  return true;
                }
              } // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
              // and `derivation` is an observer of `obj`
              // invariantShouldCompute(derivation)


              if (derivation.dependenciesState_ === IDerivationState_.STALE_) {
                untrackedEnd(prevUntracked);
                allowStateReadsEnd(prevAllowStateReads);
                return true;
              }
            }
          }

          changeDependenciesStateTo0(derivation);
          untrackedEnd(prevUntracked);
          allowStateReadsEnd(prevAllowStateReads);
          return false;
        }
    }
  }
  function checkIfStateModificationsAreAllowed(atom) {

    var hasObservers = atom.observers_.size > 0; // Should not be possible to change observed state outside strict mode, except during initialization, see #563

    if (!globalState.allowStateChanges && (hasObservers || globalState.enforceActions === "always")) console.warn("[MobX] " + (globalState.enforceActions ? "Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, a computed value or the render function of a React component? You can wrap side effects in 'runInAction' (or decorate functions with 'action') if needed. Tried to modify: ") + atom.name_);
  }
  function checkIfStateReadsAreAllowed(observable) {
    if (!globalState.allowStateReads && globalState.observableRequiresReaction) {
      console.warn("[mobx] Observable " + observable.name_ + " being read outside a reactive context");
    }
  }
  /**
   * Executes the provided function `f` and tracks which observables are being accessed.
   * The tracking information is stored on the `derivation` object and the derivation is registered
   * as observer of any of the accessed observables.
   */

  function trackDerivedFunction(derivation, f, context) {
    var prevAllowStateReads = allowStateReadsStart(true); // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies

    changeDependenciesStateTo0(derivation);
    derivation.newObserving_ = new Array(derivation.observing_.length + 100);
    derivation.unboundDepsCount_ = 0;
    derivation.runId_ = ++globalState.runId;
    var prevTracking = globalState.trackingDerivation;
    globalState.trackingDerivation = derivation;
    globalState.inBatch++;
    var result;

    if (globalState.disableErrorBoundaries === true) {
      result = f.call(context);
    } else {
      try {
        result = f.call(context);
      } catch (e) {
        result = new CaughtException(e);
      }
    }

    globalState.inBatch--;
    globalState.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    warnAboutDerivationWithoutDependencies(derivation);
    allowStateReadsEnd(prevAllowStateReads);
    return result;
  }

  function warnAboutDerivationWithoutDependencies(derivation) {
    if (derivation.observing_.length !== 0) return;

    if (globalState.reactionRequiresObservable || derivation.requiresObservable_) {
      console.warn("[mobx] Derivation " + derivation.name_ + " is created/updated without reading any observable value");
    }
  }
  /**
   * diffs newObserving with observing.
   * update observing to be newObserving with unique observables
   * notify observers that become observed/unobserved
   */


  function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    var prevObserving = derivation.observing_;
    var observing = derivation.observing_ = derivation.newObserving_;
    var lowestNewObservingDerivationState = IDerivationState_.UP_TO_DATE_; // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurrence, change to 1 and keep it
    //   1: extra occurrence, drop it

    var i0 = 0,
        l = derivation.unboundDepsCount_;

    for (var i = 0; i < l; i++) {
      var dep = observing[i];

      if (dep.diffValue_ === 0) {
        dep.diffValue_ = 1;
        if (i0 !== i) observing[i0] = dep;
        i0++;
      } // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
      // not hitting the condition


      if (dep.dependenciesState_ > lowestNewObservingDerivationState) {
        lowestNewObservingDerivationState = dep.dependenciesState_;
      }
    }

    observing.length = i0;
    derivation.newObserving_ = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0

    l = prevObserving.length;

    while (l--) {
      var _dep = prevObserving[l];

      if (_dep.diffValue_ === 0) {
        removeObserver(_dep, derivation);
      }

      _dep.diffValue_ = 0;
    } // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0


    while (i0--) {
      var _dep2 = observing[i0];

      if (_dep2.diffValue_ === 1) {
        _dep2.diffValue_ = 0;
        addObserver(_dep2, derivation);
      }
    } // Some new observed derivations may become stale during this derivation computation
    // so they have had no chance to propagate staleness (#916)


    if (lowestNewObservingDerivationState !== IDerivationState_.UP_TO_DATE_) {
      derivation.dependenciesState_ = lowestNewObservingDerivationState;
      derivation.onBecomeStale_();
    }
  }

  function clearObserving(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    var obs = derivation.observing_;
    derivation.observing_ = [];
    var i = obs.length;

    while (i--) {
      removeObserver(obs[i], derivation);
    }

    derivation.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
  }
  function untracked(action) {
    var prev = untrackedStart();

    try {
      return action();
    } finally {
      untrackedEnd(prev);
    }
  }
  function untrackedStart() {
    var prev = globalState.trackingDerivation;
    globalState.trackingDerivation = null;
    return prev;
  }
  function untrackedEnd(prev) {
    globalState.trackingDerivation = prev;
  }
  function allowStateReadsStart(allowStateReads) {
    var prev = globalState.allowStateReads;
    globalState.allowStateReads = allowStateReads;
    return prev;
  }
  function allowStateReadsEnd(prev) {
    globalState.allowStateReads = prev;
  }
  /**
   * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
   *
   */

  function changeDependenciesStateTo0(derivation) {
    if (derivation.dependenciesState_ === IDerivationState_.UP_TO_DATE_) return;
    derivation.dependenciesState_ = IDerivationState_.UP_TO_DATE_;
    var obs = derivation.observing_;
    var i = obs.length;

    while (i--) {
      obs[i].lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
    }
  }
  var MobXGlobals = function MobXGlobals() {
    this.version = 6;
    this.UNCHANGED = {};
    this.trackingDerivation = null;
    this.trackingContext = null;
    this.runId = 0;
    this.mobxGuid = 0;
    this.inBatch = 0;
    this.pendingUnobservations = [];
    this.pendingReactions = [];
    this.isRunningReactions = false;
    this.allowStateChanges = false;
    this.allowStateReads = true;
    this.enforceActions = true;
    this.spyListeners = [];
    this.globalReactionErrorHandlers = [];
    this.computedRequiresReaction = false;
    this.reactionRequiresObservable = false;
    this.observableRequiresReaction = false;
    this.disableErrorBoundaries = false;
    this.suppressReactionErrors = false;
    this.useProxies = true;
    this.verifyProxies = false;
    this.safeDescriptors = true;
  };
  var canMergeGlobalState = true;
  var globalState = /*#__PURE__*/function () {
    var global = /*#__PURE__*/getGlobal();
    if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals) canMergeGlobalState = false;
    if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals().version) canMergeGlobalState = false;

    if (!canMergeGlobalState) {
      setTimeout(function () {
        {
          die(35);
        }
      }, 1);
      return new MobXGlobals();
    } else if (global.__mobxGlobals) {
      global.__mobxInstanceCount += 1;
      if (!global.__mobxGlobals.UNCHANGED) global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible

      return global.__mobxGlobals;
    } else {
      global.__mobxInstanceCount = 1;
      return global.__mobxGlobals = /*#__PURE__*/new MobXGlobals();
    }
  }();
  //     const list = observable.observers
  //     const map = observable.observersIndexes
  //     const l = list.length
  //     for (let i = 0; i < l; i++) {
  //         const id = list[i].__mapid
  //         if (i) {
  //             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
  //         } else {
  //             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
  //         }
  //     }
  //     invariant(
  //         list.length === 0 || Object.keys(map).length === list.length - 1,
  //         "INTERNAL ERROR there is no junk in map"
  //     )
  // }

  function addObserver(observable, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    observable.observers_.add(node);
    if (observable.lowestObserverState_ > node.dependenciesState_) observable.lowestObserverState_ = node.dependenciesState_; // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
  }
  function removeObserver(observable, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    observable.observers_["delete"](node);

    if (observable.observers_.size === 0) {
      // deleting last observer
      queueForUnobservation(observable);
    } // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");

  }
  function queueForUnobservation(observable) {
    if (observable.isPendingUnobservation_ === false) {
      // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
      observable.isPendingUnobservation_ = true;
      globalState.pendingUnobservations.push(observable);
    }
  }
  /**
   * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
   * During a batch `onBecomeUnobserved` will be called at most once per observable.
   * Avoids unnecessary recalculations.
   */

  function startBatch() {
    globalState.inBatch++;
  }
  function endBatch() {
    if (--globalState.inBatch === 0) {
      runReactions(); // the batch is actually about to finish, all unobserving should happen here.

      var list = globalState.pendingUnobservations;

      for (var i = 0; i < list.length; i++) {
        var observable = list[i];
        observable.isPendingUnobservation_ = false;

        if (observable.observers_.size === 0) {
          if (observable.isBeingObserved_) {
            // if this observable had reactive observers, trigger the hooks
            observable.isBeingObserved_ = false;
            observable.onBUO();
          }

          if (observable instanceof ComputedValue) {
            // computed values are automatically teared down when the last observer leaves
            // this process happens recursively, this computed might be the last observabe of another, etc..
            observable.suspend_();
          }
        }
      }

      globalState.pendingUnobservations = [];
    }
  }
  function reportObserved(observable) {
    checkIfStateReadsAreAllowed(observable);
    var derivation = globalState.trackingDerivation;

    if (derivation !== null) {
      /**
       * Simple optimization, give each derivation run an unique id (runId)
       * Check if last time this observable was accessed the same runId is used
       * if this is the case, the relation is already known
       */
      if (derivation.runId_ !== observable.lastAccessedBy_) {
        observable.lastAccessedBy_ = derivation.runId_; // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...

        derivation.newObserving_[derivation.unboundDepsCount_++] = observable;

        if (!observable.isBeingObserved_ && globalState.trackingContext) {
          observable.isBeingObserved_ = true;
          observable.onBO();
        }
      }

      return true;
    } else if (observable.observers_.size === 0 && globalState.inBatch > 0) {
      queueForUnobservation(observable);
    }

    return false;
  } // function invariantLOS(observable: IObservable, msg: string) {
  //     // it's expensive so better not run it in produciton. but temporarily helpful for testing
  //     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
  //     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
  //     throw new Error(
  //         "lowestObserverState is wrong for " +
  //             msg +
  //             " because " +
  //             min +
  //             " < " +
  //             observable.lowestObserverState
  //     )
  // }

  /**
   * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
   * It will propagate changes to observers from previous run
   * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
   * Hopefully self reruning autoruns aren't a feature people should depend on
   * Also most basic use cases should be ok
   */
  // Called by Atom when its value changes

  function propagateChanged(observable) {
    // invariantLOS(observable, "changed start");
    if (observable.lowestObserverState_ === IDerivationState_.STALE_) return;
    observable.lowestObserverState_ = IDerivationState_.STALE_; // Ideally we use for..of here, but the downcompiled version is really slow...

    observable.observers_.forEach(function (d) {
      if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        if (d.isTracing_ !== TraceMode.NONE) {
          logTraceInfo(d, observable);
        }

        d.onBecomeStale_();
      }

      d.dependenciesState_ = IDerivationState_.STALE_;
    }); // invariantLOS(observable, "changed end");
  } // Called by ComputedValue when it recalculate and its value changed

  function propagateChangeConfirmed(observable) {
    // invariantLOS(observable, "confirmed start");
    if (observable.lowestObserverState_ === IDerivationState_.STALE_) return;
    observable.lowestObserverState_ = IDerivationState_.STALE_;
    observable.observers_.forEach(function (d) {
      if (d.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
        d.dependenciesState_ = IDerivationState_.STALE_;

        if (d.isTracing_ !== TraceMode.NONE) {
          logTraceInfo(d, observable);
        }
      } else if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_ // this happens during computing of `d`, just keep lowestObserverState up to date.
      ) {
          observable.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
        }
    }); // invariantLOS(observable, "confirmed end");
  } // Used by computed when its dependency changed, but we don't wan't to immediately recompute.

  function propagateMaybeChanged(observable) {
    // invariantLOS(observable, "maybe start");
    if (observable.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) return;
    observable.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
    observable.observers_.forEach(function (d) {
      if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        d.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
        d.onBecomeStale_();
      }
    }); // invariantLOS(observable, "maybe end");
  }

  function logTraceInfo(derivation, observable) {
    console.log("[mobx.trace] '" + derivation.name_ + "' is invalidated due to a change in: '" + observable.name_ + "'");

    if (derivation.isTracing_ === TraceMode.BREAK) {
      var lines = [];
      printDepTree(getDependencyTree(derivation), lines, 1); // prettier-ignore

      new Function("debugger;\n/*\nTracing '" + derivation.name_ + "'\n\nYou are entering this break point because derivation '" + derivation.name_ + "' is being traced and '" + observable.name_ + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
  }

  function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
      lines.push("(and many more)");
      return;
    }

    lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)

    if (tree.dependencies) tree.dependencies.forEach(function (child) {
      return printDepTree(child, lines, depth + 1);
    });
  }

  var Reaction = /*#__PURE__*/function () {
    // nodes we are looking at. Our value depends on these nodes
    function Reaction(name_, onInvalidate_, errorHandler_, requiresObservable_) {
      if (name_ === void 0) {
        name_ = "Reaction@" + getNextId() ;
      }

      if (requiresObservable_ === void 0) {
        requiresObservable_ = false;
      }

      this.name_ = void 0;
      this.onInvalidate_ = void 0;
      this.errorHandler_ = void 0;
      this.requiresObservable_ = void 0;
      this.observing_ = [];
      this.newObserving_ = [];
      this.dependenciesState_ = IDerivationState_.NOT_TRACKING_;
      this.diffValue_ = 0;
      this.runId_ = 0;
      this.unboundDepsCount_ = 0;
      this.isDisposed_ = false;
      this.isScheduled_ = false;
      this.isTrackPending_ = false;
      this.isRunning_ = false;
      this.isTracing_ = TraceMode.NONE;
      this.name_ = name_;
      this.onInvalidate_ = onInvalidate_;
      this.errorHandler_ = errorHandler_;
      this.requiresObservable_ = requiresObservable_;
    }

    var _proto = Reaction.prototype;

    _proto.onBecomeStale_ = function onBecomeStale_() {
      this.schedule_();
    };

    _proto.schedule_ = function schedule_() {
      if (!this.isScheduled_) {
        this.isScheduled_ = true;
        globalState.pendingReactions.push(this);
        runReactions();
      }
    };

    _proto.isScheduled = function isScheduled() {
      return this.isScheduled_;
    }
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    ;

    _proto.runReaction_ = function runReaction_() {
      if (!this.isDisposed_) {
        startBatch();
        this.isScheduled_ = false;
        var prev = globalState.trackingContext;
        globalState.trackingContext = this;

        if (shouldCompute(this)) {
          this.isTrackPending_ = true;

          try {
            this.onInvalidate_();

            if ("development" !== "production" && this.isTrackPending_ && isSpyEnabled()) {
              // onInvalidate didn't trigger track right away..
              spyReport({
                name: this.name_,
                type: "scheduled-reaction"
              });
            }
          } catch (e) {
            this.reportExceptionInDerivation_(e);
          }
        }

        globalState.trackingContext = prev;
        endBatch();
      }
    };

    _proto.track = function track(fn) {
      if (this.isDisposed_) {
        return; // console.warn("Reaction already disposed") // Note: Not a warning / error in mobx 4 either
      }

      startBatch();
      var notify = isSpyEnabled();
      var startTime;

      if (notify) {
        startTime = Date.now();
        spyReportStart({
          name: this.name_,
          type: "reaction"
        });
      }

      this.isRunning_ = true;
      var prevReaction = globalState.trackingContext; // reactions could create reactions...

      globalState.trackingContext = this;
      var result = trackDerivedFunction(this, fn, undefined);
      globalState.trackingContext = prevReaction;
      this.isRunning_ = false;
      this.isTrackPending_ = false;

      if (this.isDisposed_) {
        // disposed during last run. Clean up everything that was bound after the dispose call.
        clearObserving(this);
      }

      if (isCaughtException(result)) this.reportExceptionInDerivation_(result.cause);

      if (notify) {
        spyReportEnd({
          time: Date.now() - startTime
        });
      }

      endBatch();
    };

    _proto.reportExceptionInDerivation_ = function reportExceptionInDerivation_(error) {
      var _this = this;

      if (this.errorHandler_) {
        this.errorHandler_(error, this);
        return;
      }

      if (globalState.disableErrorBoundaries) throw error;
      var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'" ;

      if (!globalState.suppressReactionErrors) {
        console.error(message, error);
        /** If debugging brought you here, please, read the above message :-). Tnx! */
      } else console.warn("[mobx] (error in reaction '" + this.name_ + "' suppressed, fix error of causing action below)"); // prettier-ignore


      if (isSpyEnabled()) {
        spyReport({
          type: "error",
          name: this.name_,
          message: message,
          error: "" + error
        });
      }

      globalState.globalReactionErrorHandlers.forEach(function (f) {
        return f(error, _this);
      });
    };

    _proto.dispose = function dispose() {
      if (!this.isDisposed_) {
        this.isDisposed_ = true;

        if (!this.isRunning_) {
          // if disposed while running, clean up later. Maybe not optimal, but rare case
          startBatch();
          clearObserving(this);
          endBatch();
        }
      }
    };

    _proto.getDisposer_ = function getDisposer_() {
      var r = this.dispose.bind(this);
      r[$mobx] = this;
      return r;
    };

    _proto.toString = function toString() {
      return "Reaction[" + this.name_ + "]";
    };

    _proto.trace = function trace$1(enterBreakPoint) {
      if (enterBreakPoint === void 0) {
        enterBreakPoint = false;
      }

      trace(this, enterBreakPoint);
    };

    return Reaction;
  }();
  /**
   * Magic number alert!
   * Defines within how many times a reaction is allowed to re-trigger itself
   * until it is assumed that this is gonna be a never ending loop...
   */

  var MAX_REACTION_ITERATIONS = 100;

  var reactionScheduler = function reactionScheduler(f) {
    return f();
  };

  function runReactions() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState.inBatch > 0 || globalState.isRunningReactions) return;
    reactionScheduler(runReactionsHelper);
  }

  function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0; // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.

    while (allReactions.length > 0) {
      if (++iterations === MAX_REACTION_ITERATIONS) {
        console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]) );
        allReactions.splice(0); // clear reactions
      }

      var remainingReactions = allReactions.splice(0);

      for (var i = 0, l = remainingReactions.length; i < l; i++) {
        remainingReactions[i].runReaction_();
      }
    }

    globalState.isRunningReactions = false;
  }

  var isReaction = /*#__PURE__*/createInstanceofPredicate("Reaction", Reaction);

  function isSpyEnabled() {
    return !!globalState.spyListeners.length;
  }
  function spyReport(event) {

    if (!globalState.spyListeners.length) return;
    var listeners = globalState.spyListeners;

    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i](event);
    }
  }
  function spyReportStart(event) {

    var change = _extends({}, event, {
      spyReportStart: true
    });

    spyReport(change);
  }
  var END_EVENT = {
    type: "report-end",
    spyReportEnd: true
  };
  function spyReportEnd(change) {
    if (change) spyReport(_extends({}, change, {
      type: "report-end",
      spyReportEnd: true
    }));else spyReport(END_EVENT);
  }
  function spy(listener) {
    {
      globalState.spyListeners.push(listener);
      return once(function () {
        globalState.spyListeners = globalState.spyListeners.filter(function (l) {
          return l !== listener;
        });
      });
    }
  }

  var ACTION = "action";
  var ACTION_BOUND = "action.bound";
  var AUTOACTION = "autoAction";
  var AUTOACTION_BOUND = "autoAction.bound";
  var DEFAULT_ACTION_NAME = "<unnamed action>";
  var actionAnnotation = /*#__PURE__*/createActionAnnotation(ACTION);
  var actionBoundAnnotation = /*#__PURE__*/createActionAnnotation(ACTION_BOUND, {
    bound: true
  });
  var autoActionAnnotation = /*#__PURE__*/createActionAnnotation(AUTOACTION, {
    autoAction: true
  });
  var autoActionBoundAnnotation = /*#__PURE__*/createActionAnnotation(AUTOACTION_BOUND, {
    autoAction: true,
    bound: true
  });

  function createActionFactory(autoAction) {
    var res = function action(arg1, arg2) {
      // action(fn() {})
      if (isFunction(arg1)) return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction); // action("name", fn() {})

      if (isFunction(arg2)) return createAction(arg1, arg2, autoAction); // @action

      if (isStringish(arg2)) {
        return storeAnnotation(arg1, arg2, autoAction ? autoActionAnnotation : actionAnnotation);
      } // action("name") & @action("name")


      if (isStringish(arg1)) {
        return createDecoratorAnnotation(createActionAnnotation(autoAction ? AUTOACTION : ACTION, {
          name: arg1,
          autoAction: autoAction
        }));
      }

      die("Invalid arguments for `action`");
    };

    return res;
  }

  var action = /*#__PURE__*/createActionFactory(false);
  Object.assign(action, actionAnnotation);
  var autoAction = /*#__PURE__*/createActionFactory(true);
  Object.assign(autoAction, autoActionAnnotation);
  action.bound = /*#__PURE__*/createDecoratorAnnotation(actionBoundAnnotation);
  autoAction.bound = /*#__PURE__*/createDecoratorAnnotation(autoActionBoundAnnotation);
  function isAction(thing) {
    return isFunction(thing) && thing.isMobxAction === true;
  }

  /**
   * Creates a named reactive view and keeps it alive, so that the view is always
   * updated if one of the dependencies changes, even when the view is not further used by something else.
   * @param view The reactive view
   * @returns disposer function, which can be used to stop the view from being updated in the future.
   */

  function autorun(view, opts) {
    var _opts$name, _opts;

    if (opts === void 0) {
      opts = EMPTY_OBJECT;
    }

    {
      if (!isFunction(view)) die("Autorun expects a function as first argument");
      if (isAction(view)) die("Autorun does not accept actions since actions are untrackable");
    }

    var name = (_opts$name = (_opts = opts) == null ? void 0 : _opts.name) != null ? _opts$name : view.name || "Autorun@" + getNextId() ;
    var runSync = !opts.scheduler && !opts.delay;
    var reaction;

    if (runSync) {
      // normal autorun
      reaction = new Reaction(name, function () {
        this.track(reactionRunner);
      }, opts.onError, opts.requiresObservable);
    } else {
      var scheduler = createSchedulerFromOptions(opts); // debounced autorun

      var isScheduled = false;
      reaction = new Reaction(name, function () {
        if (!isScheduled) {
          isScheduled = true;
          scheduler(function () {
            isScheduled = false;
            if (!reaction.isDisposed_) reaction.track(reactionRunner);
          });
        }
      }, opts.onError, opts.requiresObservable);
    }

    function reactionRunner() {
      view(reaction);
    }

    reaction.schedule_();
    return reaction.getDisposer_();
  }

  var run = function run(f) {
    return f();
  };

  function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
      return setTimeout(f, opts.delay);
    } : run;
  }

  var ON_BECOME_OBSERVED = "onBO";
  var ON_BECOME_UNOBSERVED = "onBUO";
  function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
  }
  function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
  }

  function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
    var cb = isFunction(arg3) ? arg3 : arg2;
    var listenersKey = hook + "L";

    if (atom[listenersKey]) {
      atom[listenersKey].add(cb);
    } else {
      atom[listenersKey] = new Set([cb]);
    }

    return function () {
      var hookListeners = atom[listenersKey];

      if (hookListeners) {
        hookListeners["delete"](cb);

        if (hookListeners.size === 0) {
          delete atom[listenersKey];
        }
      }
    };
  }

  function extendObservable(target, properties, annotations, options) {
    {
      if (arguments.length > 4) die("'extendObservable' expected 2-4 arguments");
      if (typeof target !== "object") die("'extendObservable' expects an object as first argument");
      if (isObservableMap(target)) die("'extendObservable' should not be used on maps, use map.merge instead");
      if (!isPlainObject(properties)) die("'extendObservabe' only accepts plain objects as second argument");
      if (isObservable(properties) || isObservable(annotations)) die("Extending an object with another observable (object) is not supported");
    } // Pull descriptors first, so we don't have to deal with props added by administration ($mobx)


    var descriptors = getOwnPropertyDescriptors(properties);
    var adm = asObservableObject(target, options)[$mobx];
    startBatch();

    try {
      ownKeys(descriptors).forEach(function (key) {
        adm.extend_(key, descriptors[key], // must pass "undefined" for { key: undefined }
        !annotations ? true : key in annotations ? annotations[key] : true);
      });
    } finally {
      endBatch();
    }

    return target;
  }

  function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
  }

  function nodeToDependencyTree(node) {
    var result = {
      name: node.name_
    };
    if (node.observing_ && node.observing_.length > 0) result.dependencies = unique(node.observing_).map(nodeToDependencyTree);
    return result;
  }

  function unique(list) {
    return Array.from(new Set(list));
  }

  var generatorId = 0;
  function FlowCancellationError() {
    this.message = "FLOW_CANCELLED";
  }
  FlowCancellationError.prototype = /*#__PURE__*/Object.create(Error.prototype);
  var flowAnnotation = /*#__PURE__*/createFlowAnnotation("flow");
  var flowBoundAnnotation = /*#__PURE__*/createFlowAnnotation("flow.bound", {
    bound: true
  });
  var flow = /*#__PURE__*/Object.assign(function flow(arg1, arg2) {
    // @flow
    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, flowAnnotation);
    } // flow(fn)


    if (arguments.length !== 1) die("Flow expects single argument with generator function");
    var generator = arg1;
    var name = generator.name || "<unnamed flow>"; // Implementation based on https://github.com/tj/co/blob/master/index.js

    var res = function res() {
      var ctx = this;
      var args = arguments;
      var runId = ++generatorId;
      var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
      var rejector;
      var pendingPromise = undefined;
      var promise = new Promise(function (resolve, reject) {
        var stepId = 0;
        rejector = reject;

        function onFulfilled(res) {
          pendingPromise = undefined;
          var ret;

          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
          } catch (e) {
            return reject(e);
          }

          next(ret);
        }

        function onRejected(err) {
          pendingPromise = undefined;
          var ret;

          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
          } catch (e) {
            return reject(e);
          }

          next(ret);
        }

        function next(ret) {
          if (isFunction(ret == null ? void 0 : ret.then)) {
            // an async iterator
            ret.then(next, reject);
            return;
          }

          if (ret.done) return resolve(ret.value);
          pendingPromise = Promise.resolve(ret.value);
          return pendingPromise.then(onFulfilled, onRejected);
        }

        onFulfilled(undefined); // kick off the process
      });
      promise.cancel = action(name + " - runid: " + runId + " - cancel", function () {
        try {
          if (pendingPromise) cancelPromise(pendingPromise); // Finally block can return (or yield) stuff..

          var _res = gen["return"](undefined); // eat anything that promise would do, it's cancelled!


          var yieldedPromise = Promise.resolve(_res.value);
          yieldedPromise.then(noop$1, noop$1);
          cancelPromise(yieldedPromise); // maybe it can be cancelled :)
          // reject our original promise

          rejector(new FlowCancellationError());
        } catch (e) {
          rejector(e); // there could be a throwing finally block
        }
      });
      return promise;
    };

    res.isMobXFlow = true;
    return res;
  }, flowAnnotation);
  flow.bound = /*#__PURE__*/createDecoratorAnnotation(flowBoundAnnotation);

  function cancelPromise(promise) {
    if (isFunction(promise.cancel)) promise.cancel();
  }
  function isFlow(fn) {
    return (fn == null ? void 0 : fn.isMobXFlow) === true;
  }

  function _isObservable(value, property) {
    if (!value) return false;

    if (property !== undefined) {
      if ((isObservableMap(value) || isObservableArray(value))) return die("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");

      if (isObservableObject(value)) {
        return value[$mobx].values_.has(property);
      }

      return false;
    } // For first check, see #701


    return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
  }

  function isObservable(value) {
    if (arguments.length !== 1) die("isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isObservable(value);
  }

  function trace() {
    var enterBreakPoint = false;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[args.length - 1] === "boolean") enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);

    if (!derivation) {
      return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }

    if (derivation.isTracing_ === TraceMode.NONE) {
      console.log("[mobx.trace] '" + derivation.name_ + "' tracing enabled");
    }

    derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
  }

  function getAtomFromArgs(args) {
    switch (args.length) {
      case 0:
        return globalState.trackingDerivation;

      case 1:
        return getAtom(args[0]);

      case 2:
        return getAtom(args[0], args[1]);
    }
  }

  /**
   * During a transaction no views are updated until the end of the transaction.
   * The transaction will be run synchronously nonetheless.
   *
   * @param action a function that updates some reactive state
   * @returns any value that was returned by the 'action' parameter.
   */

  function transaction(action, thisArg) {
    if (thisArg === void 0) {
      thisArg = undefined;
    }

    startBatch();

    try {
      return action.apply(thisArg);
    } finally {
      endBatch();
    }
  }

  function getAdm(target) {
    return target[$mobx];
  } // Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
  // and skip either the internal values map, or the base object with its property descriptors!


  var objectProxyTraps = {
    has: function has(target, name) {
      if (globalState.trackingDerivation) warnAboutProxyRequirement("detect new properties using the 'in' operator. Use 'has' from 'mobx' instead.");
      return getAdm(target).has_(name);
    },
    get: function get(target, name) {
      return getAdm(target).get_(name);
    },
    set: function set(target, name, value) {
      var _getAdm$set_;

      if (!isStringish(name)) return false;

      if (!getAdm(target).values_.has(name)) {
        warnAboutProxyRequirement("add a new observable property through direct assignment. Use 'set' from 'mobx' instead.");
      } // null (intercepted) -> true (success)


      return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
    },
    deleteProperty: function deleteProperty(target, name) {
      var _getAdm$delete_;

      {
        warnAboutProxyRequirement("delete properties from an observable object. Use 'remove' from 'mobx' instead.");
      }

      if (!isStringish(name)) return false; // null (intercepted) -> true (success)

      return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
    },
    defineProperty: function defineProperty(target, name, descriptor) {
      var _getAdm$definePropert;

      {
        warnAboutProxyRequirement("define property on an observable object. Use 'defineProperty' from 'mobx' instead.");
      } // null (intercepted) -> true (success)


      return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
    },
    ownKeys: function ownKeys(target) {
      if (globalState.trackingDerivation) warnAboutProxyRequirement("iterate keys to detect added / removed properties. Use 'keys' from 'mobx' instead.");
      return getAdm(target).ownKeys_();
    },
    preventExtensions: function preventExtensions(target) {
      die(13);
    }
  };
  function asDynamicObservableObject(target, options) {
    var _target$$mobx, _target$$mobx$proxy_;

    assertProxies();
    target = asObservableObject(target, options);
    return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
  }

  function hasInterceptors(interceptable) {
    return interceptable.interceptors_ !== undefined && interceptable.interceptors_.length > 0;
  }
  function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
    interceptors.push(handler);
    return once(function () {
      var idx = interceptors.indexOf(handler);
      if (idx !== -1) interceptors.splice(idx, 1);
    });
  }
  function interceptChange(interceptable, change) {
    var prevU = untrackedStart();

    try {
      // Interceptor can modify the array, copy it to avoid concurrent modification, see #1950
      var interceptors = [].concat(interceptable.interceptors_ || []);

      for (var i = 0, l = interceptors.length; i < l; i++) {
        change = interceptors[i](change);
        if (change && !change.type) die(14);
        if (!change) break;
      }

      return change;
    } finally {
      untrackedEnd(prevU);
    }
  }

  function hasListeners(listenable) {
    return listenable.changeListeners_ !== undefined && listenable.changeListeners_.length > 0;
  }
  function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
    listeners.push(handler);
    return once(function () {
      var idx = listeners.indexOf(handler);
      if (idx !== -1) listeners.splice(idx, 1);
    });
  }
  function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners_;
    if (!listeners) return;
    listeners = listeners.slice();

    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i](change);
    }

    untrackedEnd(prevU);
  }

  function makeObservable(target, annotations, options) {
    var adm = asObservableObject(target, options)[$mobx];
    startBatch();

    try {
      var _annotations;

      // Default to decorators
      (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target); // Annotate

      ownKeys(annotations).forEach(function (key) {
        return adm.make_(key, annotations[key]);
      });
    } finally {
      endBatch();
    }

    return target;
  } // proto[keysSymbol] = new Set<PropertyKey>()

  var SPLICE = "splice";
  var UPDATE = "update";
  var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859

  var arrayTraps = {
    get: function get(target, name) {
      var adm = target[$mobx];
      if (name === $mobx) return adm;
      if (name === "length") return adm.getArrayLength_();

      if (typeof name === "string" && !isNaN(name)) {
        return adm.get_(parseInt(name));
      }

      if (hasProp(arrayExtensions, name)) {
        return arrayExtensions[name];
      }

      return target[name];
    },
    set: function set(target, name, value) {
      var adm = target[$mobx];

      if (name === "length") {
        adm.setArrayLength_(value);
      }

      if (typeof name === "symbol" || isNaN(name)) {
        target[name] = value;
      } else {
        // numeric string
        adm.set_(parseInt(name), value);
      }

      return true;
    },
    preventExtensions: function preventExtensions() {
      die(15);
    }
  };
  var ObservableArrayAdministration = /*#__PURE__*/function () {
    // this is the prop that gets proxied, so can't replace it!
    function ObservableArrayAdministration(name, enhancer, owned_, legacyMode_) {
      if (name === void 0) {
        name = "ObservableArray@" + getNextId() ;
      }

      this.owned_ = void 0;
      this.legacyMode_ = void 0;
      this.atom_ = void 0;
      this.values_ = [];
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.enhancer_ = void 0;
      this.dehancer = void 0;
      this.proxy_ = void 0;
      this.lastKnownLength_ = 0;
      this.owned_ = owned_;
      this.legacyMode_ = legacyMode_;
      this.atom_ = new Atom(name);

      this.enhancer_ = function (newV, oldV) {
        return enhancer(newV, oldV, name + "[..]" );
      };
    }

    var _proto = ObservableArrayAdministration.prototype;

    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== undefined) return this.dehancer(value);
      return value;
    };

    _proto.dehanceValues_ = function dehanceValues_(values) {
      if (this.dehancer !== undefined && values.length > 0) return values.map(this.dehancer);
      return values;
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === void 0) {
        fireImmediately = false;
      }

      if (fireImmediately) {
        listener({
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: "splice",
          index: 0,
          added: this.values_.slice(),
          addedCount: this.values_.length,
          removed: [],
          removedCount: 0
        });
      }

      return registerListener(this, listener);
    };

    _proto.getArrayLength_ = function getArrayLength_() {
      this.atom_.reportObserved();
      return this.values_.length;
    };

    _proto.setArrayLength_ = function setArrayLength_(newLength) {
      if (typeof newLength !== "number" || newLength < 0) die("Out of range: " + newLength);
      var currentLength = this.values_.length;
      if (newLength === currentLength) return;else if (newLength > currentLength) {
        var newItems = new Array(newLength - currentLength);

        for (var i = 0; i < newLength - currentLength; i++) {
          newItems[i] = undefined;
        } // No Array.fill everywhere...


        this.spliceWithArray_(currentLength, 0, newItems);
      } else this.spliceWithArray_(newLength, currentLength - newLength);
    };

    _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
      if (oldLength !== this.lastKnownLength_) die(16);
      this.lastKnownLength_ += delta;
      if (this.legacyMode_ && delta > 0) reserveArrayBuffer(oldLength + delta + 1);
    };

    _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
      var _this = this;

      checkIfStateModificationsAreAllowed(this.atom_);
      var length = this.values_.length;
      if (index === undefined) index = 0;else if (index > length) index = length;else if (index < 0) index = Math.max(0, length + index);
      if (arguments.length === 1) deleteCount = length - index;else if (deleteCount === undefined || deleteCount === null) deleteCount = 0;else deleteCount = Math.max(0, Math.min(deleteCount, length - index));
      if (newItems === undefined) newItems = EMPTY_ARRAY;

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_,
          type: SPLICE,
          index: index,
          removedCount: deleteCount,
          added: newItems
        });
        if (!change) return EMPTY_ARRAY;
        deleteCount = change.removedCount;
        newItems = change.added;
      }

      newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
        return _this.enhancer_(v, undefined);
      });

      if (this.legacyMode_ || "development" !== "production") {
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength_(length, lengthDelta); // checks if internal array wasn't modified
      }

      var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);
      if (deleteCount !== 0 || newItems.length !== 0) this.notifyArraySplice_(index, newItems, res);
      return this.dehanceValues_(res);
    };

    _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
      if (newItems.length < MAX_SPLICE_SIZE) {
        var _this$values_;

        return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
      } else {
        var res = this.values_.slice(index, index + deleteCount);
        var oldItems = this.values_.slice(index + deleteCount);
        this.values_.length = index + newItems.length - deleteCount;

        for (var i = 0; i < newItems.length; i++) {
          this.values_[index + i] = newItems[i];
        }

        for (var _i = 0; _i < oldItems.length; _i++) {
          this.values_[index + newItems.length + _i] = oldItems[_i];
        }

        return res;
      }
    };

    _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        type: UPDATE,
        debugObjectName: this.atom_.name_,
        index: index,
        newValue: newValue,
        oldValue: oldValue
      } : null; // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
      // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled

      if (notifySpy) spyReportStart(change);
      this.atom_.reportChanged();
      if (notify) notifyListeners(this, change);
      if (notifySpy) spyReportEnd();
    };

    _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: SPLICE,
        index: index,
        removed: removed,
        added: added,
        removedCount: removed.length,
        addedCount: added.length
      } : null;
      if (notifySpy) spyReportStart(change);
      this.atom_.reportChanged(); // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe

      if (notify) notifyListeners(this, change);
      if (notifySpy) spyReportEnd();
    };

    _proto.get_ = function get_(index) {
      if (index < this.values_.length) {
        this.atom_.reportObserved();
        return this.dehanceValue_(this.values_[index]);
      }

      console.warn("[mobx] Out of bounds read: " + index );
    };

    _proto.set_ = function set_(index, newValue) {
      var values = this.values_;

      if (index < values.length) {
        // update at index in range
        checkIfStateModificationsAreAllowed(this.atom_);
        var oldValue = values[index];

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_,
            index: index,
            newValue: newValue
          });
          if (!change) return;
          newValue = change.newValue;
        }

        newValue = this.enhancer_(newValue, oldValue);
        var changed = newValue !== oldValue;

        if (changed) {
          values[index] = newValue;
          this.notifyArrayChildUpdate_(index, newValue, oldValue);
        }
      } else if (index === values.length) {
        // add a new item
        this.spliceWithArray_(index, 0, [newValue]);
      } else {
        // out of bounds
        die(17, index, values.length);
      }
    };

    return ObservableArrayAdministration;
  }();
  function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === void 0) {
      name = "ObservableArray@" + getNextId() ;
    }

    if (owned === void 0) {
      owned = false;
    }

    assertProxies();
    var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
    addHiddenFinalProp(adm.values_, $mobx, adm);
    var proxy = new Proxy(adm.values_, arrayTraps);
    adm.proxy_ = proxy;

    if (initialValues && initialValues.length) {
      var prev = allowStateChangesStart(true);
      adm.spliceWithArray_(0, 0, initialValues);
      allowStateChangesEnd(prev);
    }

    return proxy;
  } // eslint-disable-next-line

  var arrayExtensions = {
    clear: function clear() {
      return this.splice(0);
    },
    replace: function replace(newItems) {
      var adm = this[$mobx];
      return adm.spliceWithArray_(0, adm.values_.length, newItems);
    },
    // Used by JSON.stringify
    toJSON: function toJSON() {
      return this.slice();
    },

    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice: function splice(index, deleteCount) {
      for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        newItems[_key - 2] = arguments[_key];
      }

      var adm = this[$mobx];

      switch (arguments.length) {
        case 0:
          return [];

        case 1:
          return adm.spliceWithArray_(index);

        case 2:
          return adm.spliceWithArray_(index, deleteCount);
      }

      return adm.spliceWithArray_(index, deleteCount, newItems);
    },
    spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
      return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
    },
    push: function push() {
      var adm = this[$mobx];

      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      adm.spliceWithArray_(adm.values_.length, 0, items);
      return adm.values_.length;
    },
    pop: function pop() {
      return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
    },
    shift: function shift() {
      return this.splice(0, 1)[0];
    },
    unshift: function unshift() {
      var adm = this[$mobx];

      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }

      adm.spliceWithArray_(0, 0, items);
      return adm.values_.length;
    },
    reverse: function reverse() {
      // reverse by default mutates in place before returning the result
      // which makes it both a 'derivation' and a 'mutation'.
      if (globalState.trackingDerivation) {
        die(37, "reverse");
      }

      this.replace(this.slice().reverse());
      return this;
    },
    sort: function sort() {
      // sort by default mutates in place before returning the result
      // which goes against all good practices. Let's not change the array in place!
      if (globalState.trackingDerivation) {
        die(37, "sort");
      }

      var copy = this.slice();
      copy.sort.apply(copy, arguments);
      this.replace(copy);
      return this;
    },
    remove: function remove(value) {
      var adm = this[$mobx];
      var idx = adm.dehanceValues_(adm.values_).indexOf(value);

      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      }

      return false;
    }
  };
  /**
   * Wrap function from prototype
   * Without this, everything works as well, but this works
   * faster as everything works on unproxied values
   */

  addArrayExtension("concat", simpleFunc);
  addArrayExtension("flat", simpleFunc);
  addArrayExtension("includes", simpleFunc);
  addArrayExtension("indexOf", simpleFunc);
  addArrayExtension("join", simpleFunc);
  addArrayExtension("lastIndexOf", simpleFunc);
  addArrayExtension("slice", simpleFunc);
  addArrayExtension("toString", simpleFunc);
  addArrayExtension("toLocaleString", simpleFunc); // map

  addArrayExtension("every", mapLikeFunc);
  addArrayExtension("filter", mapLikeFunc);
  addArrayExtension("find", mapLikeFunc);
  addArrayExtension("findIndex", mapLikeFunc);
  addArrayExtension("flatMap", mapLikeFunc);
  addArrayExtension("forEach", mapLikeFunc);
  addArrayExtension("map", mapLikeFunc);
  addArrayExtension("some", mapLikeFunc); // reduce

  addArrayExtension("reduce", reduceLikeFunc);
  addArrayExtension("reduceRight", reduceLikeFunc);

  function addArrayExtension(funcName, funcFactory) {
    if (typeof Array.prototype[funcName] === "function") {
      arrayExtensions[funcName] = funcFactory(funcName);
    }
  } // Report and delegate to dehanced array


  function simpleFunc(funcName) {
    return function () {
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  } // Make sure callbacks recieve correct array arg #2326


  function mapLikeFunc(funcName) {
    return function (callback, thisArg) {
      var _this2 = this;

      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName](function (element, index) {
        return callback.call(thisArg, element, index, _this2);
      });
    };
  } // Make sure callbacks recieve correct array arg #2326


  function reduceLikeFunc(funcName) {
    return function () {
      var _this3 = this;

      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_); // #2432 - reduce behavior depends on arguments.length

      var callback = arguments[0];

      arguments[0] = function (accumulator, currentValue, index) {
        return callback(accumulator, currentValue, index, _this3);
      };

      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }

  var isObservableArrayAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);
  function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
  }

  var _Symbol$iterator, _Symbol$toStringTag;
  var ObservableMapMarker = {};
  var ADD = "add";
  var DELETE = "delete"; // just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
  // But: https://github.com/mobxjs/mobx/issues/1556

  _Symbol$iterator = Symbol.iterator;
  _Symbol$toStringTag = Symbol.toStringTag;
  var ObservableMap = /*#__PURE__*/function () {
    // hasMap, not hashMap >-).
    function ObservableMap(initialData, enhancer_, name_) {
      if (enhancer_ === void 0) {
        enhancer_ = deepEnhancer;
      }

      if (name_ === void 0) {
        name_ = "ObservableMap@" + getNextId() ;
      }

      this.enhancer_ = void 0;
      this.name_ = void 0;
      this[$mobx] = ObservableMapMarker;
      this.data_ = void 0;
      this.hasMap_ = void 0;
      this.keysAtom_ = void 0;
      this.interceptors_ = void 0;
      this.changeListeners_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = enhancer_;
      this.name_ = name_;

      if (!isFunction(Map)) {
        die(18);
      }

      this.keysAtom_ = createAtom(this.name_ + ".keys()" );
      this.data_ = new Map();
      this.hasMap_ = new Map();
      this.merge(initialData);
    }

    var _proto = ObservableMap.prototype;

    _proto.has_ = function has_(key) {
      return this.data_.has(key);
    };

    _proto.has = function has(key) {
      var _this = this;

      if (!globalState.trackingDerivation) return this.has_(key);
      var entry = this.hasMap_.get(key);

      if (!entry) {
        var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?" , false);
        this.hasMap_.set(key, newEntry);
        onBecomeUnobserved(newEntry, function () {
          return _this.hasMap_["delete"](key);
        });
      }

      return entry.get();
    };

    _proto.set = function set(key, value) {
      var hasKey = this.has_(key);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: hasKey ? UPDATE : ADD,
          object: this,
          newValue: value,
          name: key
        });
        if (!change) return this;
        value = change.newValue;
      }

      if (hasKey) {
        this.updateValue_(key, value);
      } else {
        this.addValue_(key, value);
      }

      return this;
    };

    _proto["delete"] = function _delete(key) {
      var _this2 = this;

      checkIfStateModificationsAreAllowed(this.keysAtom_);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          name: key
        });
        if (!change) return false;
      }

      if (this.has_(key)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);

        var _change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: this.data_.get(key).value_,
          name: key
        } : null;

        if (notifySpy) spyReportStart(_change);
        transaction(function () {
          _this2.keysAtom_.reportChanged();

          _this2.updateHasMapEntry_(key, false);

          var observable = _this2.data_.get(key);

          observable.setNewValue_(undefined);

          _this2.data_["delete"](key);
        });
        if (notify) notifyListeners(this, _change);
        if (notifySpy) spyReportEnd();
        return true;
      }

      return false;
    };

    _proto.updateHasMapEntry_ = function updateHasMapEntry_(key, value) {
      var entry = this.hasMap_.get(key);

      if (entry) {
        entry.setNewValue_(value);
      }
    };

    _proto.updateValue_ = function updateValue_(key, newValue) {
      var observable = this.data_.get(key);
      newValue = observable.prepareNewValue_(newValue);

      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: UPDATE,
          object: this,
          oldValue: observable.value_,
          name: key,
          newValue: newValue
        } : null;
        if (notifySpy) spyReportStart(change);
        observable.setNewValue_(newValue);
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
      }
    };

    _proto.addValue_ = function addValue_(key, newValue) {
      var _this3 = this;

      checkIfStateModificationsAreAllowed(this.keysAtom_);
      transaction(function () {
        var observable = new ObservableValue(newValue, _this3.enhancer_, _this3.name_ + "." + stringifyKey(key) , false);

        _this3.data_.set(key, observable);

        newValue = observable.value_; // value might have been changed

        _this3.updateHasMapEntry_(key, true);

        _this3.keysAtom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy) spyReportStart(change);
      if (notify) notifyListeners(this, change);
      if (notifySpy) spyReportEnd();
    };

    _proto.get = function get(key) {
      if (this.has(key)) return this.dehanceValue_(this.data_.get(key).get());
      return this.dehanceValue_(undefined);
    };

    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }

      return value;
    };

    _proto.keys = function keys() {
      this.keysAtom_.reportObserved();
      return this.data_.keys();
    };

    _proto.values = function values() {
      var self = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next = keys.next(),
              done = _keys$next.done,
              value = _keys$next.value;

          return {
            done: done,
            value: done ? undefined : self.get(value)
          };
        }
      });
    };

    _proto.entries = function entries() {
      var self = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next2 = keys.next(),
              done = _keys$next2.done,
              value = _keys$next2.value;

          return {
            done: done,
            value: done ? undefined : [value, self.get(value)]
          };
        }
      });
    };

    _proto[_Symbol$iterator] = function () {
      return this.entries();
    };

    _proto.forEach = function forEach(callback, thisArg) {
      for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
            key = _step$value[0],
            value = _step$value[1];
        callback.call(thisArg, value, key, this);
      }
    }
    /** Merge another object into this object, returns this. */
    ;

    _proto.merge = function merge(other) {
      var _this4 = this;

      if (isObservableMap(other)) {
        other = new Map(other);
      }

      transaction(function () {
        if (isPlainObject(other)) getPlainObjectKeys(other).forEach(function (key) {
          return _this4.set(key, other[key]);
        });else if (Array.isArray(other)) other.forEach(function (_ref) {
          var key = _ref[0],
              value = _ref[1];
          return _this4.set(key, value);
        });else if (isES6Map(other)) {
          if (other.constructor !== Map) die(19, other);
          other.forEach(function (value, key) {
            return _this4.set(key, value);
          });
        } else if (other !== null && other !== undefined) die(20, other);
      });
      return this;
    };

    _proto.clear = function clear() {
      var _this5 = this;

      transaction(function () {
        untracked(function () {
          for (var _iterator2 = _createForOfIteratorHelperLoose(_this5.keys()), _step2; !(_step2 = _iterator2()).done;) {
            var key = _step2.value;

            _this5["delete"](key);
          }
        });
      });
    };

    _proto.replace = function replace(values) {
      var _this6 = this;

      // Implementation requirements:
      // - respect ordering of replacement map
      // - allow interceptors to run and potentially prevent individual operations
      // - don't recreate observables that already exist in original map (so we don't destroy existing subscriptions)
      // - don't _keysAtom.reportChanged if the keys of resulting map are indentical (order matters!)
      // - note that result map may differ from replacement map due to the interceptors
      transaction(function () {
        // Convert to map so we can do quick key lookups
        var replacementMap = convertToMap(values);
        var orderedData = new Map(); // Used for optimization

        var keysReportChangedCalled = false; // Delete keys that don't exist in replacement map
        // if the key deletion is prevented by interceptor
        // add entry at the beginning of the result map

        for (var _iterator3 = _createForOfIteratorHelperLoose(_this6.data_.keys()), _step3; !(_step3 = _iterator3()).done;) {
          var key = _step3.value;

          // Concurrently iterating/deleting keys
          // iterator should handle this correctly
          if (!replacementMap.has(key)) {
            var deleted = _this6["delete"](key); // Was the key removed?


            if (deleted) {
              // _keysAtom.reportChanged() was already called
              keysReportChangedCalled = true;
            } else {
              // Delete prevented by interceptor
              var value = _this6.data_.get(key);

              orderedData.set(key, value);
            }
          }
        } // Merge entries


        for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done;) {
          var _step4$value = _step4.value,
              _key = _step4$value[0],
              _value = _step4$value[1];

          // We will want to know whether a new key is added
          var keyExisted = _this6.data_.has(_key); // Add or update value


          _this6.set(_key, _value); // The addition could have been prevent by interceptor


          if (_this6.data_.has(_key)) {
            // The update could have been prevented by interceptor
            // and also we want to preserve existing values
            // so use value from _data map (instead of replacement map)
            var _value2 = _this6.data_.get(_key);

            orderedData.set(_key, _value2); // Was a new key added?

            if (!keyExisted) {
              // _keysAtom.reportChanged() was already called
              keysReportChangedCalled = true;
            }
          }
        } // Check for possible key order change


        if (!keysReportChangedCalled) {
          if (_this6.data_.size !== orderedData.size) {
            // If size differs, keys are definitely modified
            _this6.keysAtom_.reportChanged();
          } else {
            var iter1 = _this6.data_.keys();

            var iter2 = orderedData.keys();
            var next1 = iter1.next();
            var next2 = iter2.next();

            while (!next1.done) {
              if (next1.value !== next2.value) {
                _this6.keysAtom_.reportChanged();

                break;
              }

              next1 = iter1.next();
              next2 = iter2.next();
            }
          }
        } // Use correctly ordered map


        _this6.data_ = orderedData;
      });
      return this;
    };

    _proto.toString = function toString() {
      return "[object ObservableMap]";
    };

    _proto.toJSON = function toJSON() {
      return Array.from(this);
    };

    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === true) die("`observe` doesn't support fireImmediately=true in combination with maps.");
      return registerListener(this, listener);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _createClass(ObservableMap, [{
      key: "size",
      get: function get() {
        this.keysAtom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag,
      get: function get() {
        return "Map";
      }
    }]);

    return ObservableMap;
  }(); // eslint-disable-next-line

  var isObservableMap = /*#__PURE__*/createInstanceofPredicate("ObservableMap", ObservableMap);

  function convertToMap(dataStructure) {
    if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
      return dataStructure;
    } else if (Array.isArray(dataStructure)) {
      return new Map(dataStructure);
    } else if (isPlainObject(dataStructure)) {
      var map = new Map();

      for (var key in dataStructure) {
        map.set(key, dataStructure[key]);
      }

      return map;
    } else {
      return die(21, dataStructure);
    }
  }

  var _Symbol$iterator$1, _Symbol$toStringTag$1;
  var ObservableSetMarker = {};
  _Symbol$iterator$1 = Symbol.iterator;
  _Symbol$toStringTag$1 = Symbol.toStringTag;
  var ObservableSet = /*#__PURE__*/function () {
    function ObservableSet(initialData, enhancer, name_) {
      if (enhancer === void 0) {
        enhancer = deepEnhancer;
      }

      if (name_ === void 0) {
        name_ = "ObservableSet@" + getNextId() ;
      }

      this.name_ = void 0;
      this[$mobx] = ObservableSetMarker;
      this.data_ = new Set();
      this.atom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.dehancer = void 0;
      this.enhancer_ = void 0;
      this.name_ = name_;

      if (!isFunction(Set)) {
        die(22);
      }

      this.atom_ = createAtom(this.name_);

      this.enhancer_ = function (newV, oldV) {
        return enhancer(newV, oldV, name_);
      };

      if (initialData) {
        this.replace(initialData);
      }
    }

    var _proto = ObservableSet.prototype;

    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }

      return value;
    };

    _proto.clear = function clear() {
      var _this = this;

      transaction(function () {
        untracked(function () {
          for (var _iterator = _createForOfIteratorHelperLoose(_this.data_.values()), _step; !(_step = _iterator()).done;) {
            var value = _step.value;

            _this["delete"](value);
          }
        });
      });
    };

    _proto.forEach = function forEach(callbackFn, thisArg) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done;) {
        var value = _step2.value;
        callbackFn.call(thisArg, value, value, this);
      }
    };

    _proto.add = function add(value) {
      var _this2 = this;

      checkIfStateModificationsAreAllowed(this.atom_);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: ADD,
          object: this,
          newValue: value
        });
        if (!change) return this; // ideally, value = change.value would be done here, so that values can be
        // changed by interceptor. Same applies for other Set and Map api's.
      }

      if (!this.has(value)) {
        transaction(function () {
          _this2.data_.add(_this2.enhancer_(value, undefined));

          _this2.atom_.reportChanged();
        });
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);

        var _change = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          newValue: value
        } : null;

        if (notifySpy && "development" !== "production") spyReportStart(_change);
        if (notify) notifyListeners(this, _change);
        if (notifySpy && "development" !== "production") spyReportEnd();
      }

      return this;
    };

    _proto["delete"] = function _delete(value) {
      var _this3 = this;

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          oldValue: value
        });
        if (!change) return false;
      }

      if (this.has(value)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);

        var _change2 = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: value
        } : null;

        if (notifySpy && "development" !== "production") spyReportStart(_change2);
        transaction(function () {
          _this3.atom_.reportChanged();

          _this3.data_["delete"](value);
        });
        if (notify) notifyListeners(this, _change2);
        if (notifySpy && "development" !== "production") spyReportEnd();
        return true;
      }

      return false;
    };

    _proto.has = function has(value) {
      this.atom_.reportObserved();
      return this.data_.has(this.dehanceValue_(value));
    };

    _proto.entries = function entries() {
      var nextIndex = 0;
      var keys = Array.from(this.keys());
      var values = Array.from(this.values());
      return makeIterable({
        next: function next() {
          var index = nextIndex;
          nextIndex += 1;
          return index < values.length ? {
            value: [keys[index], values[index]],
            done: false
          } : {
            done: true
          };
        }
      });
    };

    _proto.keys = function keys() {
      return this.values();
    };

    _proto.values = function values() {
      this.atom_.reportObserved();
      var self = this;
      var nextIndex = 0;
      var observableValues = Array.from(this.data_.values());
      return makeIterable({
        next: function next() {
          return nextIndex < observableValues.length ? {
            value: self.dehanceValue_(observableValues[nextIndex++]),
            done: false
          } : {
            done: true
          };
        }
      });
    };

    _proto.replace = function replace(other) {
      var _this4 = this;

      if (isObservableSet(other)) {
        other = new Set(other);
      }

      transaction(function () {
        if (Array.isArray(other)) {
          _this4.clear();

          other.forEach(function (value) {
            return _this4.add(value);
          });
        } else if (isES6Set(other)) {
          _this4.clear();

          other.forEach(function (value) {
            return _this4.add(value);
          });
        } else if (other !== null && other !== undefined) {
          die("Cannot initialize set from " + other);
        }
      });
      return this;
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      // ... 'fireImmediately' could also be true?
      if (fireImmediately === true) die("`observe` doesn't support fireImmediately=true in combination with sets.");
      return registerListener(this, listener);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.toJSON = function toJSON() {
      return Array.from(this);
    };

    _proto.toString = function toString() {
      return "[object ObservableSet]";
    };

    _proto[_Symbol$iterator$1] = function () {
      return this.values();
    };

    _createClass(ObservableSet, [{
      key: "size",
      get: function get() {
        this.atom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag$1,
      get: function get() {
        return "Set";
      }
    }]);

    return ObservableSet;
  }(); // eslint-disable-next-line

  var isObservableSet = /*#__PURE__*/createInstanceofPredicate("ObservableSet", ObservableSet);

  var descriptorCache = /*#__PURE__*/Object.create(null);
  var REMOVE = "remove";
  var ObservableObjectAdministration = /*#__PURE__*/function () {
    function ObservableObjectAdministration(target_, values_, name_, // Used anytime annotation is not explicitely provided
    defaultAnnotation_) {
      if (values_ === void 0) {
        values_ = new Map();
      }

      if (defaultAnnotation_ === void 0) {
        defaultAnnotation_ = autoAnnotation;
      }

      this.target_ = void 0;
      this.values_ = void 0;
      this.name_ = void 0;
      this.defaultAnnotation_ = void 0;
      this.keysAtom_ = void 0;
      this.changeListeners_ = void 0;
      this.interceptors_ = void 0;
      this.proxy_ = void 0;
      this.isPlainObject_ = void 0;
      this.appliedAnnotations_ = void 0;
      this.pendingKeys_ = void 0;
      this.target_ = target_;
      this.values_ = values_;
      this.name_ = name_;
      this.defaultAnnotation_ = defaultAnnotation_;
      this.keysAtom_ = new Atom(this.name_ + ".keys" ); // Optimization: we use this frequently

      this.isPlainObject_ = isPlainObject(this.target_);

      if (!isAnnotation(this.defaultAnnotation_)) {
        die("defaultAnnotation must be valid annotation");
      }

      {
        // Prepare structure for tracking which fields were already annotated
        this.appliedAnnotations_ = {};
      }
    }

    var _proto = ObservableObjectAdministration.prototype;

    _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
      return this.values_.get(key).get();
    };

    _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
      var observable = this.values_.get(key);

      if (observable instanceof ComputedValue) {
        observable.set(newValue);
        return true;
      } // intercept


      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: newValue
        });
        if (!change) return null;
        newValue = change.newValue;
      }

      newValue = observable.prepareNewValue_(newValue); // notify spy & observers

      if (newValue !== globalState.UNCHANGED) {
        var notify = hasListeners(this);
        var notifySpy = isSpyEnabled();

        var _change = notify || notifySpy ? {
          type: UPDATE,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          oldValue: observable.value_,
          name: key,
          newValue: newValue
        } : null;

        if (notifySpy) spyReportStart(_change);
        observable.setNewValue_(newValue);
        if (notify) notifyListeners(this, _change);
        if (notifySpy) spyReportEnd();
      }

      return true;
    };

    _proto.get_ = function get_(key) {
      if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
        // Key doesn't exist yet, subscribe for it in case it's added later
        this.has_(key);
      }

      return this.target_[key];
    }
    /**
     * @param {PropertyKey} key
     * @param {any} value
     * @param {Annotation|boolean} annotation true - use default annotation, false - copy as is
     * @param {boolean} proxyTrap whether it's called from proxy trap
     * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
     */
    ;

    _proto.set_ = function set_(key, value, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }

      // Don't use .has(key) - we care about own
      if (hasProp(this.target_, key)) {
        // Existing prop
        if (this.values_.has(key)) {
          // Observable (can be intercepted)
          return this.setObservablePropValue_(key, value);
        } else if (proxyTrap) {
          // Non-observable - proxy
          return Reflect.set(this.target_, key, value);
        } else {
          // Non-observable
          this.target_[key] = value;
          return true;
        }
      } else {
        // New prop
        return this.extend_(key, {
          value: value,
          enumerable: true,
          writable: true,
          configurable: true
        }, this.defaultAnnotation_, proxyTrap);
      }
    } // Trap for "in"
    ;

    _proto.has_ = function has_(key) {
      if (!globalState.trackingDerivation) {
        // Skip key subscription outside derivation
        return key in this.target_;
      }

      this.pendingKeys_ || (this.pendingKeys_ = new Map());
      var entry = this.pendingKeys_.get(key);

      if (!entry) {
        entry = new ObservableValue(key in this.target_, referenceEnhancer, this.name_ + "." + stringifyKey(key) + "?" , false);
        this.pendingKeys_.set(key, entry);
      }

      return entry.get();
    }
    /**
     * @param {PropertyKey} key
     * @param {Annotation|boolean} annotation true - use default annotation, false - ignore prop
     */
    ;

    _proto.make_ = function make_(key, annotation) {
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }

      if (annotation === false) {
        return;
      }

      assertAnnotable(this, annotation, key);

      if (!(key in this.target_)) {
        var _this$target_$storedA;

        // Throw on missing key, except for decorators:
        // Decorator annotations are collected from whole prototype chain.
        // When called from super() some props may not exist yet.
        // However we don't have to worry about missing prop,
        // because the decorator must have been applied to something.
        if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) == null ? void 0 : _this$target_$storedA[key]) {
          return; // will be annotated by subclass constructor
        } else {
          die(1, annotation.annotationType_, this.name_ + "." + key.toString());
        }
      }

      var source = this.target_;

      while (source && source !== objectPrototype) {
        var descriptor = getDescriptor(source, key);

        if (descriptor) {
          var outcome = annotation.make_(this, key, descriptor, source);
          if (outcome === 0
          /* Cancel */
          ) return;
          if (outcome === 1
          /* Break */
          ) break;
        }

        source = Object.getPrototypeOf(source);
      }

      recordAnnotationApplied(this, annotation, key);
    }
    /**
     * @param {PropertyKey} key
     * @param {PropertyDescriptor} descriptor
     * @param {Annotation|boolean} annotation true - use default annotation, false - copy as is
     * @param {boolean} proxyTrap whether it's called from proxy trap
     * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
     */
    ;

    _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }

      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }

      if (annotation === false) {
        return this.defineProperty_(key, descriptor, proxyTrap);
      }

      assertAnnotable(this, annotation, key);
      var outcome = annotation.extend_(this, key, descriptor, proxyTrap);

      if (outcome) {
        recordAnnotationApplied(this, annotation, key);
      }

      return outcome;
    }
    /**
     * @param {PropertyKey} key
     * @param {PropertyDescriptor} descriptor
     * @param {boolean} proxyTrap whether it's called from proxy trap
     * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
     */
    ;

    _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }

      try {
        startBatch(); // Delete

        var deleteOutcome = this.delete_(key);

        if (!deleteOutcome) {
          // Failure or intercepted
          return deleteOutcome;
        } // ADD interceptor


        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: descriptor.value
          });
          if (!change) return null;
          var newValue = change.newValue;

          if (descriptor.value !== newValue) {
            descriptor = _extends({}, descriptor, {
              value: newValue
            });
          }
        } // Define


        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        } // Notify


        this.notifyPropertyAddition_(key, descriptor.value);
      } finally {
        endBatch();
      }

      return true;
    } // If original descriptor becomes relevant, move this to annotation directly
    ;

    _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }

      try {
        startBatch(); // Delete

        var deleteOutcome = this.delete_(key);

        if (!deleteOutcome) {
          // Failure or intercepted
          return deleteOutcome;
        } // ADD interceptor


        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: value
          });
          if (!change) return null;
          value = change.newValue;
        }

        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: true,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        }; // Define

        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }

        var observable = new ObservableValue(value, enhancer, "development" !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key", false);
        this.values_.set(key, observable); // Notify (value possibly changed by ObservableValue)

        this.notifyPropertyAddition_(key, observable.value_);
      } finally {
        endBatch();
      }

      return true;
    } // If original descriptor becomes relevant, move this to annotation directly
    ;

    _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }

      try {
        startBatch(); // Delete

        var deleteOutcome = this.delete_(key);

        if (!deleteOutcome) {
          // Failure or intercepted
          return deleteOutcome;
        } // ADD interceptor


        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: undefined
          });
          if (!change) return null;
        }

        options.name || (options.name = "development" !== "production" ? this.name_ + "." + key.toString() : "ObservableObject.key");
        options.context = this.proxy_ || this.target_;
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: false,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        }; // Define

        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }

        this.values_.set(key, new ComputedValue(options)); // Notify

        this.notifyPropertyAddition_(key, undefined);
      } finally {
        endBatch();
      }

      return true;
    }
    /**
     * @param {PropertyKey} key
     * @param {PropertyDescriptor} descriptor
     * @param {boolean} proxyTrap whether it's called from proxy trap
     * @returns {boolean|null} true on success, false on failure (proxyTrap + non-configurable), null when cancelled by interceptor
     */
    ;

    _proto.delete_ = function delete_(key, proxyTrap) {
      if (proxyTrap === void 0) {
        proxyTrap = false;
      }

      // No such prop
      if (!hasProp(this.target_, key)) {
        return true;
      } // Intercept


      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: REMOVE
        }); // Cancelled

        if (!change) return null;
      } // Delete


      try {
        var _this$pendingKeys_, _this$pendingKeys_$ge;

        startBatch();
        var notify = hasListeners(this);
        var notifySpy = "development" !== "production" && isSpyEnabled();
        var observable = this.values_.get(key); // Value needed for spies/listeners

        var value = undefined; // Optimization: don't pull the value unless we will need it

        if (!observable && (notify || notifySpy)) {
          var _getDescriptor;

          value = (_getDescriptor = getDescriptor(this.target_, key)) == null ? void 0 : _getDescriptor.value;
        } // delete prop (do first, may fail)


        if (proxyTrap) {
          if (!Reflect.deleteProperty(this.target_, key)) {
            return false;
          }
        } else {
          delete this.target_[key];
        } // Allow re-annotating this field


        if ("development" !== "production") {
          delete this.appliedAnnotations_[key];
        } // Clear observable


        if (observable) {
          this.values_["delete"](key); // for computed, value is undefined

          if (observable instanceof ObservableValue) {
            value = observable.value_;
          } // Notify: autorun(() => obj[key]), see #1796


          propagateChanged(observable);
        } // Notify "keys/entries/values" observers


        this.keysAtom_.reportChanged(); // Notify "has" observers
        // "in" as it may still exist in proto

        (_this$pendingKeys_ = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? void 0 : _this$pendingKeys_$ge.set(key in this.target_); // Notify spies/listeners

        if (notify || notifySpy) {
          var _change2 = {
            type: REMOVE,
            observableKind: "object",
            object: this.proxy_ || this.target_,
            debugObjectName: this.name_,
            oldValue: value,
            name: key
          };
          if ("development" !== "production" && notifySpy) spyReportStart(_change2);
          if (notify) notifyListeners(this, _change2);
          if ("development" !== "production" && notifySpy) spyReportEnd();
        }
      } finally {
        endBatch();
      }

      return true;
    }
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ;

    _proto.observe_ = function observe_(callback, fireImmediately) {
      if (fireImmediately === true) die("`observe` doesn't support the fire immediately property for observable objects.");
      return registerListener(this, callback);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
      var _this$pendingKeys_2, _this$pendingKeys_2$g;

      var notify = hasListeners(this);
      var notifySpy = isSpyEnabled();

      if (notify || notifySpy) {
        var change = notify || notifySpy ? {
          type: ADD,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: value
        } : null;
        if (notifySpy) spyReportStart(change);
        if (notify) notifyListeners(this, change);
        if (notifySpy) spyReportEnd();
      }

      (_this$pendingKeys_2 = this.pendingKeys_) == null ? void 0 : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? void 0 : _this$pendingKeys_2$g.set(true); // Notify "keys/entries/values" observers

      this.keysAtom_.reportChanged();
    };

    _proto.ownKeys_ = function ownKeys_() {
      this.keysAtom_.reportObserved();
      return ownKeys(this.target_);
    };

    _proto.keys_ = function keys_() {
      // Returns enumerable && own, but unfortunately keysAtom will report on ANY key change.
      // There is no way to distinguish between Object.keys(object) and Reflect.ownKeys(object) - both are handled by ownKeys trap.
      // We can either over-report in Object.keys(object) or under-report in Reflect.ownKeys(object)
      // We choose to over-report in Object.keys(object), because:
      // - typically it's used with simple data objects
      // - when symbolic/non-enumerable keys are relevant Reflect.ownKeys works as expected
      this.keysAtom_.reportObserved();
      return Object.keys(this.target_);
    };

    return ObservableObjectAdministration;
  }();
  function asObservableObject(target, options) {
    var _options$name;

    if (options && isObservableObject(target)) {
      die("Options can't be provided for already observable objects.");
    }

    if (hasProp(target, $mobx)) {
      if (!(getAdministration(target) instanceof ObservableObjectAdministration)) {
        die("Cannot convert '" + getDebugName(target) + "' into observable object:" + "\nThe target is already observable of different type." + "\nExtending builtins is not supported.");
      }

      return target;
    }

    if (!Object.isExtensible(target)) die("Cannot make the designated object observable; it is not extensible");
    var name = (_options$name = options == null ? void 0 : options.name) != null ? _options$name : (isPlainObject(target) ? "ObservableObject" : target.constructor.name) + "@" + getNextId() ;
    var adm = new ObservableObjectAdministration(target, new Map(), String(name), getAnnotationFromOptions(options));
    addHiddenProp(target, $mobx, adm);
    return target;
  }
  var isObservableObjectAdministration = /*#__PURE__*/createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);

  function getCachedObservablePropDescriptor(key) {
    return descriptorCache[key] || (descriptorCache[key] = {
      get: function get() {
        return this[$mobx].getObservablePropValue_(key);
      },
      set: function set(value) {
        return this[$mobx].setObservablePropValue_(key, value);
      }
    });
  }

  function isObservableObject(thing) {
    if (isObject(thing)) {
      return isObservableObjectAdministration(thing[$mobx]);
    }

    return false;
  }
  function recordAnnotationApplied(adm, annotation, key) {
    var _adm$target_$storedAn;

    {
      adm.appliedAnnotations_[key] = annotation;
    } // Remove applied decorator annotation so we don't try to apply it again in subclass constructor


    (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
  }

  function assertAnnotable(adm, annotation, key) {
    // Valid annotation
    if (!isAnnotation(annotation)) {
      die("Cannot annotate '" + adm.name_ + "." + key.toString() + "': Invalid annotation.");
    }
    /*
    // Configurable, not sealed, not frozen
    // Possibly not needed, just a little better error then the one thrown by engine.
    // Cases where this would be useful the most (subclass field initializer) are not interceptable by this.
    if (__DEV__) {
        const configurable = getDescriptor(adm.target_, key)?.configurable
        const frozen = Object.isFrozen(adm.target_)
        const sealed = Object.isSealed(adm.target_)
        if (!configurable || frozen || sealed) {
            const fieldName = `${adm.name_}.${key.toString()}`
            const requestedAnnotationType = annotation.annotationType_
            let error = `Cannot apply '${requestedAnnotationType}' to '${fieldName}':`
            if (frozen) {
                error += `\nObject is frozen.`
            }
            if (sealed) {
                error += `\nObject is sealed.`
            }
            if (!configurable) {
                error += `\nproperty is not configurable.`
                // Mention only if caused by us to avoid confusion
                if (hasProp(adm.appliedAnnotations!, key)) {
                    error += `\nTo prevent accidental re-definition of a field by a subclass, `
                    error += `all annotated fields of non-plain objects (classes) are not configurable.`
                }
            }
            die(error)
        }
    }
    */
    // Not annotated


    if (!isOverride(annotation) && hasProp(adm.appliedAnnotations_, key)) {
      var fieldName = adm.name_ + "." + key.toString();
      var currentAnnotationType = adm.appliedAnnotations_[key].annotationType_;
      var requestedAnnotationType = annotation.annotationType_;
      die("Cannot apply '" + requestedAnnotationType + "' to '" + fieldName + "':" + ("\nThe field is already annotated with '" + currentAnnotationType + "'.") + "\nRe-annotating fields is not allowed." + "\nUse 'override' annotation for methods overriden by subclass.");
    }
  }

  /**
   * This array buffer contains two lists of properties, so that all arrays
   * can recycle their property definitions, which significantly improves performance of creating
   * properties on the fly.
   */

  var OBSERVABLE_ARRAY_BUFFER_SIZE = 0; // Typescript workaround to make sure ObservableArray extends Array

  var StubArray = function StubArray() {};

  function inherit$1(ctor, proto) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ctor.prototype, proto);
    } else if (ctor.prototype.__proto__ !== undefined) {
      ctor.prototype.__proto__ = proto;
    } else {
      ctor.prototype = proto;
    }
  }

  inherit$1(StubArray, Array.prototype); // Weex proto freeze protection was here,
  // but it is unclear why the hack is need as MobX never changed the prototype
  // anyway, so removed it in V6

  var LegacyObservableArray = /*#__PURE__*/function (_StubArray) {
    _inheritsLoose(LegacyObservableArray, _StubArray);

    function LegacyObservableArray(initialValues, enhancer, name, owned) {
      var _this;

      if (name === void 0) {
        name = "ObservableArray@" + getNextId() ;
      }

      if (owned === void 0) {
        owned = false;
      }

      _this = _StubArray.call(this) || this;
      var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
      adm.proxy_ = _assertThisInitialized(_this);
      addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);

      if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart(true); // @ts-ignore

        _this.spliceWithArray(0, 0, initialValues);

        allowStateChangesEnd(prev);
      }

      return _this;
    }

    var _proto = LegacyObservableArray.prototype;

    _proto.concat = function concat() {
      this[$mobx].atom_.reportObserved();

      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }

      return Array.prototype.concat.apply(this.slice(), //@ts-ignore
      arrays.map(function (a) {
        return isObservableArray(a) ? a.slice() : a;
      }));
    };

    _proto[Symbol.iterator] = function () {
      var self = this;
      var nextIndex = 0;
      return makeIterable({
        next: function next() {
          // @ts-ignore
          return nextIndex < self.length ? {
            value: self[nextIndex++],
            done: false
          } : {
            done: true,
            value: undefined
          };
        }
      });
    };

    _createClass(LegacyObservableArray, [{
      key: "length",
      get: function get() {
        return this[$mobx].getArrayLength_();
      },
      set: function set(newLength) {
        this[$mobx].setArrayLength_(newLength);
      }
    }, {
      key: Symbol.toStringTag,
      get: function get() {
        return "Array";
      }
    }]);

    return LegacyObservableArray;
  }(StubArray);

  Object.entries(arrayExtensions).forEach(function (_ref) {
    var prop = _ref[0],
        fn = _ref[1];
    if (prop !== "concat") addHiddenProp(LegacyObservableArray.prototype, prop, fn);
  });

  function createArrayEntryDescriptor(index) {
    return {
      enumerable: false,
      configurable: true,
      get: function get() {
        return this[$mobx].get_(index);
      },
      set: function set(value) {
        this[$mobx].set_(index, value);
      }
    };
  }

  function createArrayBufferItem(index) {
    defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
  }

  function reserveArrayBuffer(max) {
    if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
      for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
        createArrayBufferItem(index);
      }

      OBSERVABLE_ARRAY_BUFFER_SIZE = max;
    }
  }
  reserveArrayBuffer(1000);
  function createLegacyArray(initialValues, enhancer, name) {
    return new LegacyObservableArray(initialValues, enhancer, name);
  }

  function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
      if (isObservableArray(thing)) {
        if (property !== undefined) die(23);
        return thing[$mobx].atom_;
      }

      if (isObservableSet(thing)) {
        return thing[$mobx];
      }

      if (isObservableMap(thing)) {
        if (property === undefined) return thing.keysAtom_;
        var observable = thing.data_.get(property) || thing.hasMap_.get(property);
        if (!observable) die(25, property, getDebugName(thing));
        return observable;
      }

      if (isObservableObject(thing)) {
        if (!property) return die(26);

        var _observable = thing[$mobx].values_.get(property);

        if (!_observable) die(27, property, getDebugName(thing));
        return _observable;
      }

      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
      }
    } else if (isFunction(thing)) {
      if (isReaction(thing[$mobx])) {
        // disposer function
        return thing[$mobx];
      }
    }

    die(28);
  }
  function getAdministration(thing, property) {
    if (!thing) die(29);
    if (property !== undefined) return getAdministration(getAtom(thing, property));
    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) return thing;
    if (isObservableMap(thing) || isObservableSet(thing)) return thing;
    if (thing[$mobx]) return thing[$mobx];
    die(24, thing);
  }
  function getDebugName(thing, property) {
    var named;

    if (property !== undefined) {
      named = getAtom(thing, property);
    } else if (isAction(thing)) {
      return thing.name;
    } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
      named = getAdministration(thing);
    } else {
      // valid for arrays as well
      named = getAtom(thing);
    }

    return named.name_;
  }

  var toString = objectPrototype.toString;
  function deepEqual(a, b, depth) {
    if (depth === void 0) {
      depth = -1;
    }

    return eq(a, b, depth);
  } // Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
  // Internal recursive comparison function for `isEqual`.

  function eq(a, b, depth, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b; // `null` or `undefined` only equal to itself (strict comparison).

    if (a == null || b == null) return false; // `NaN`s are equivalent, but non-reflexive.

    if (a !== a) return b !== b; // Exhaust primitive checks

    var type = typeof a;
    if (!isFunction(type) && type !== "object" && typeof b != "object") return false; // Compare `[[Class]]` names.

    var className = toString.call(a);
    if (className !== toString.call(b)) return false;

    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case "[object RegExp]": // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')

      case "[object String]":
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return "" + a === "" + b;

      case "[object Number]":
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b; // An `egal` comparison is performed for other numeric values.

        return +a === 0 ? 1 / +a === 1 / b : +a === +b;

      case "[object Date]":
      case "[object Boolean]":
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;

      case "[object Symbol]":
        return typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b);

      case "[object Map]":
      case "[object Set]":
        // Maps and Sets are unwrapped to arrays of entry-pairs, adding an incidental level.
        // Hide this extra level by increasing the depth.
        if (depth >= 0) {
          depth++;
        }

        break;
    } // Unwrap any wrapped objects.


    a = unwrap(a);
    b = unwrap(b);
    var areArrays = className === "[object Array]";

    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object") return false; // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.

      var aCtor = a.constructor,
          bCtor = b.constructor;

      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
        return false;
      }
    }

    if (depth === 0) {
      return false;
    } else if (depth < 0) {
      depth = -1;
    } // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.


    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    } // Add the first object to the stack of traversed objects.


    aStack.push(a);
    bStack.push(b); // Recursively compare objects and arrays.

    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false; // Deep compare the contents, ignoring non-numeric properties.

      while (length--) {
        if (!eq(a[length], b[length], depth - 1, aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = Object.keys(a);
      var key;
      length = keys.length; // Ensure that both objects contain the same number of properties before comparing deep equality.

      if (Object.keys(b).length !== length) return false;

      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(hasProp(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) return false;
      }
    } // Remove the first object from the stack of traversed objects.


    aStack.pop();
    bStack.pop();
    return true;
  }

  function unwrap(a) {
    if (isObservableArray(a)) return a.slice();
    if (isES6Map(a) || isObservableMap(a)) return Array.from(a.entries());
    if (isES6Set(a) || isObservableSet(a)) return Array.from(a.entries());
    return a;
  }

  function makeIterable(iterator) {
    iterator[Symbol.iterator] = getSelf;
    return iterator;
  }

  function getSelf() {
    return this;
  }

  function isAnnotation(thing) {
    return (// Can be function
      thing instanceof Object && typeof thing.annotationType_ === "string" && isFunction(thing.make_) && isFunction(thing.extend_)
    );
  }

  /**
   * (c) Michel Weststrate 2015 - 2020
   * MIT Licensed
   *
   * Welcome to the mobx sources! To get an global overview of how MobX internally works,
   * this is a good place to start:
   * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
   *
   * Source folders:
   * ===============
   *
   * - api/     Most of the public static methods exposed by the module can be found here.
   * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
   * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
   * - utils/   Utility stuff.
   *
   */
  ["Symbol", "Map", "Set", "Symbol"].forEach(function (m) {
    var g = getGlobal();

    if (typeof g[m] === "undefined") {
      die("MobX requires global '" + m + "' to be available or polyfilled");
    }
  });

  if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // See: https://github.com/andykog/mobx-devtools/
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy: spy,
      extras: {
        getDebugName: getDebugName
      },
      $mobx: $mobx
    });
  }

  // On-demand plots provide the file manager with the type of file they are requesting. Maybe the session should be treated as a plot? So it prescribes the type of file it would like to have, and then that is passed to the file manager, which just loads and stores it? So filemanager would be a filelibrary?

  var _removeByFilenames = /*#__PURE__*/_classPrivateFieldLooseKey("removeByFilenames");

  var _removeByClass = /*#__PURE__*/_classPrivateFieldLooseKey("removeByClass");

  var _remove = /*#__PURE__*/_classPrivateFieldLooseKey("remove");

  var filelibrary = /*#__PURE__*/function () {
    function filelibrary() {
      _classCallCheck(this, filelibrary);

      Object.defineProperty(this, _remove, {
        value: _remove2
      });
      Object.defineProperty(this, _removeByClass, {
        value: _removeByClass2
      });
      Object.defineProperty(this, _removeByFilenames, {
        value: _removeByFilenames2
      });

      var _obj = this;

      _obj.files = [];
      _obj.failed = []; // The library does not know the whole extent of the files that are currently required - it only knows what was requested of it. To let it know what is actively needed an array of filenames must be communicated to it.

      _obj.required = []; // I don't want the files to be loaded over and over again. So maybe it's good to have a background storage that keeps all the files, and a frontend storage that computes itself based on hte background and the currently requested status? Maybe still good, because the unnecessary files are disposed of automatically.
      // Make the class observable.

      makeObservable(_obj, {
        single: action,
        updateactive: action,
        store: action,
        files: observable,
        required: observable
      }); // It should keep updating itself to make sure that requested matches the files/failed.

      autorun(function () {
        _obj.update();
      });
    } // constructor
    // LOADING


    _createClass$1(filelibrary, [{
      key: "single",
      value: function single(classref, file, requester) {
        var obj = this; // Filename is not necessarily just a filename. It can also be a `File' object. In that case the URL cannot be created from the name itself. In cases when on-demand data is being loaded, `file' must be the relative path to the file.

        if (file instanceof File) {
          file = {
            url: URL.createObjectURL(file),
            filename: file.name
          };
        } else {
          file = {
            url: file,
            filename: file
          };
        } // if
        // Check if this file already exists loaded in. Only unique filenames are saved, so this should only return a single item in the array.


        var libraryEntry = obj.retrieveByFilenames([file.filename])[0];

        if (libraryEntry) {
          return libraryEntry;
        } else {
          // Initiate loading. After loading if the file has loaded correctly it has some content and can be added to internal storage.
          var fileobj = new classref(file, requester);
          fileobj.load();
          fileobj.promise.then(function (fileobj_) {
            return obj.store(fileobj_);
          }); // obj.store(fileobj)

          return fileobj.promise;
        } // if

      } // single
      // THE ANONYMOUS FUNCTION MUST BE THE `ACTION'. REWORK

    }, {
      key: "store",
      value: function store(fileobj) {
        var obj = this; // fileobj.promise.then(function(fileobj){
        // Other files should be stored if they have any content.

        if (fileobj.content) {
          // Successfuly loaded files.
          obj.required.push(fileobj.filename);
          obj.files.push(fileobj);
        } else {
          // Errors were incurred.
          obj.failed.push(fileobj);
        } // if
        // }) // then

      } // store

    }, {
      key: "retrieveByFilenames",
      value: function retrieveByFilenames(filenames) {
        // If filenames are defined, then return specific files.
        var obj = this;
        return obj.files.filter(function (file) {
          return filenames.includes(file.filename);
        }); // filter
      } // retrieve

    }, {
      key: "retrieveByClass",
      value: function retrieveByClass(classref) {
        // If filename is defined, then try to return that file. Otherwise return all.
        var obj = this;
        return obj.files.filter(function (file) {
          return file instanceof classref;
        }); // filter
      } // retrieveByClass
      // UPDATING

    }, {
      key: "updateactive",
      value: function updateactive(filenames) {
        // This is kept separate to allow autorun to perform updates without calling input parameters.
        var obj = this;
        obj.required = filenames;
      } // updateactive

    }, {
      key: "update",
      value: function update() {
        // Actually, just allow the plots to issue orders on hteir own. The library update only collects the files that are not required anymore. So this checks to make sure that any files that are no longer needed get thrown out.
        // But for that it must have access to the filtered tasks, as well as the plots. Maybe there should just be a collection point into which the plots submit their requests, and the library then responds. And when the plots required files change, that would update.
        var obj = this;
        var filesForRemoval = obj.files.filter(function (file) {
          return !obj.required.includes(file.filename);
        }); // filter
        // Failed loadings should also be removed if they're no longer needed. Maybe still keep everything in a background _files? And produce the failed and files based on that?

        _classPrivateFieldLooseBase(obj, _remove)[_remove](filesForRemoval);
      } // update
      // REMOVAL
      // removeFiles

    }]);

    return filelibrary;
  }(); // filelibrary


  function _removeByFilenames2(filenames) {
    // `filenames' is an array of string file names.
    var obj = this;

    _classPrivateFieldLooseBase(obj, _remove)[_remove](obj.retrieveByFilenames(filenames));
  }

  function _removeByClass2(classref) {
    // `classref' is a class reference such that: new classref(inputs) instanceof classref.
    var obj = this;

    _classPrivateFieldLooseBase(obj, _remove)[_remove](obj.retrieveByClass(classref));
  }

  function _remove2(files) {
    var obj = this; // For each of these find it's index, and splice it.

    files.forEach(function (file) {
      var i = obj.files.indexOf(file);
      obj.files.splice(i, 1);
    });
  }

  var dbsliceFile = /*#__PURE__*/function () {
    function dbsliceFile(file, requester) {
      _classCallCheck(this, dbsliceFile); // How to load if file is an actual File object.


      this.url = file.url;
      this.filename = file.filename;
      this.extension = file.filename.split(".").pop();
      this.promise = undefined; // Also log the requestor. If this was passed in then use the passed in value, otherwise the requestor is the user.

      this.requester = requester ? requester : "unknown"; // Only dbslicefile interacts with errors. The errors are saved attached to the files that produced them. But they are saved separately in the library to both allow them to be reloaded when needed, and to be able to generate an error report for the user.

      this.errors = [];
    } // constructor


    _createClass$1(dbsliceFile, [{
      key: "load",
      value: function load() {
        // Collect the data and perform input testing.
        var obj = this; // Based on the url decide how to load the file.

        var loader;

        switch (this.extension) {
          case "csv":
            loader = function loader(url) {
              return d3.text(url).then(function (text) {
                // Filter out any lines that begin with '#', and then parse the rest as csv.
                var text_ = text.split("\n"); // Don't directly filter, but instead just remove lines until the first one without a '#'.

                for (var i = 0; i < text_.length; i++) {
                  if (text_[0].startsWith("#") || text_[0].startsWith("\"#")) {
                    text_.splice(0, 1);
                  } else {
                    break;
                  } // if

                } // for


                text_ = text_.join("\n");
                return d3.csvParse(text_);
              });
            };

            break;

          /*
          case "csv":
          	loader = function(url){ return d3.csv(url) }
          	break;
          */

          case "json":
            loader = function loader(url) {
              return d3.json(url);
            };

            break;

          default:
            // Return a rejected promise as the file extension is wrong.
            loader = function loader() {
              return Promise.reject(new Error("LoaderError: Unsupported Extension"));
            };

            break;
        }
        // Wrap in a larger promise that allows the handling of exceptions.

        var loadPromise = new Promise(function (resolve, reject) {
          // If the URL points to a non-existing file the d3 loader will reject the promise and throw an error, but still proceed down the resolve branch!
          loader(obj.url).then(function (content) {
            // Since d3 insists on running the resolve branch even though it doesn't find the file, handle missing contents here.
            // csv files are always read as strings - convert numbers to numbers. Should be done here. If it's done in a preceeding promise then the error is lost.
            obj.content = content;
            resolve(obj);
          }, function (e) {
            // 'e' is an error triggered during loading.
            // The two errors that can enter here are file missing, and a problem reading the file.
            // This routes any errors that d3 might have into hte new promise.
            reject(e);
          });
        }).then(this.format).then(this.onload)["catch"](function (e) {
          // This catches all the rejects. 'e' is the field into which the error can be logged.
          delete obj.content;
          obj.errors.push(e);
          return obj;
        });
        this.promise = loadPromise;
      } // load

    }, {
      key: "onload",
      value: function onload(obj) {
        return obj;
      } // onload

    }, {
      key: "format",
      value: function format(obj) {
        return obj;
      } // format

    }], [{
      key: "testrow",
      value: // test
      // Maybe move these to helpers??
      function testrow(array) {
        if (array.length > 0) {
          var i = Math.floor(Math.random() * array.length);
          return {
            i: i,
            row: array[i]
          }; // return
        } else {
          throw new Error("InvalidInput: Array without entries");
        } // if

      } // testrow

    }, {
      key: "convertNumbers",
      value: function convertNumbers(array) {
        return array.map(function (row) {
          var r = {};

          for (var k in row) {
            r[k] = +row[k];

            if (isNaN(r[k])) {
              r[k] = row[k];
            } // if

          } // for


          return r;
        });
      } // convertNumbers

    }]);

    return dbsliceFile;
  }(); // dbsliceFile


  dbsliceFile.test = {
    structure: function structure(fileClass, content) {
      // This an abstract test director. When a file is loaded the file classes do not know exactly how to handle to contents. This test director tries different implemented approaches to reformat the data, and stops when a suitable approach is found. In the future this may be extended to the point where the test involves performing a dummy plotting operation, as the plotting is the last operation to be performed on the file data.
      var content_; // No differentiating between the structure or the content failing - the file classes are trying several different structures.
      // Try to use all different file structures possible.

      Object.getOwnPropertyNames(fileClass.structure).every(function (name) {
        try {
          content_ = fileClass.structure[name](content); // Return false breaks the loop. This return is reached only if the test was successfully performed and passed.

          return content_ ? false : true;
        } catch (e) {
          // Keep looping
          content_ = undefined;
          return true;
        } // try

      }); // forEach

      if (content_) {
        // Restructuring succeeded.
        return content_;
      } else {
        throw new Error("InvalidFile: Unsupported data structure");
      } // if

    } // structure

  };

  var line2dFile = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(line2dFile, _dbsliceFile);

    var _super = _createSuper(line2dFile);

    function line2dFile() {
      _classCallCheck(this, line2dFile);

      return _super.apply(this, arguments);
    }

    _createClass$1(line2dFile, [{
      key: "format",
      value: function format(obj) {
        var content = dbsliceFile.test.structure(line2dFile, obj.content); // Rename the variables to remove leading and trailing blanks.			

        obj.content = line2dFile.rename(content);
        return obj;
      } // format
      // Structure should be testable outside as well, as it will have to be called bt onDemandFile when its trying to classify the files.

    }], [{
      key: "rename",
      value: // test
      function rename(content) {
        // What happens if two names are the same after blanks have been trimmed? Retain the data, but add a modifier to the end.
        var renamemap = content.variables.reduce(function (acc, oldname) {
          var newname = oldname.trim();

          if (oldname != newname) {
            // Trimming changed something.
            var allnames = Object.getOwnPropertyNames(acc);
            var i = 0;

            while (allnames.includes(newname)) {
              newname += "_"; // Safety break

              i += 1;

              if (i > 10) {
                break;
              } // if

            } // while


            acc[oldname] = newname;
          } // if


          return acc;
        }, {}); // reduce
        // Rename the whole content.data array.

        var namestoreplace = Object.getOwnPropertyNames(renamemap);
        content.data.forEach(function (row) {
          namestoreplace.forEach(function (oldname) {
            var newname = renamemap[oldname];
            row[newname] = row[oldname];
            delete row[oldname];
          });
        });
        content.variables = Object.getOwnPropertyNames(content.data[0]);
        return content;
      } // rename

    }]);

    return line2dFile;
  }(dbsliceFile); // line2dFile


  line2dFile.structure = {
    csv2lineFile: function csv2lineFile(content) {
      if (Array.isArray(content)) {
        var content_ = {
          variables: content.columns,
          data: dbsliceFile.convertNumbers(content)
        }; // Test the new contents.

        line2dFile.test.content(content_); // Structure test succeeded. Delete the columns that accompany the array object.

        delete content_.data.columns;
        return content_;
      } else {
        return undefined;
      } // if

    },
    // array
    json2lineFile: function json2lineFile(content) {
      if (Array.isArray(content.data)) {
        var content_ = {
          variables: Object.getOwnPropertyNames(content.data[0]),
          data: content.data
        }; // Test the new contents.

        line2dFile.test.content(content_);
        return content_;
      } else {
        return undefined;
      } // if

    } // object

  };
  line2dFile.test = {
    content: function content(_content) {
      if (_content.variables.length < 2) {
        throw new Error("InvalidFile: No variable pair detected");
      } // if
      // All values MUST be numeric!


      var testrow = dbsliceFile.testrow(_content.data);
      var areAllContentsNumeric = Object.getOwnPropertyNames(testrow.row).every(function (varName) {
        var value = testrow.row[varName];
        return typeof value === 'number' && isFinite(value);
      });

      if (!areAllContentsNumeric) {
        // There are non-numeric values in the data.
        throw new Error("InvalidFile: Some variables include non-numeric values.");
      } // if


      return true;
    } // content

  };

  var contour2dFile = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(contour2dFile, _dbsliceFile);

    var _super = _createSuper(contour2dFile);

    function contour2dFile() {
      _classCallCheck(this, contour2dFile);

      return _super.apply(this, arguments);
    }

    _createClass$1(contour2dFile, [{
      key: "format",
      value: function format(obj) {
        obj.content = dbsliceFile.test.structure(contour2dFile, obj.content);
        return obj;
      } // format
      // structure

    }]);

    return contour2dFile;
  }(dbsliceFile); // contour2dFile


  contour2dFile.structure = {
    // This can now more easily handle different ways of specifying contours. Also convenient to implement the data structure conversion here, e.g. from points to triangles.
    json2contour2dFile: function json2contour2dFile(content) {
      // Not supposed to be an array! It should contain a single surface. If content.surfaces IS an array, then just select the first one.
      var surface = Array.isArray(content.surfaces) ? content.surfaces[0] : content.surfaces; // In the content I expect an array called `y', `x', `v' (or others), and `size'. The first three must all be the same length, and the last one must have 2 numbers.

      var L = surface.x.length == surface.y.length && surface.x.length > 3 ? surface.x.length : undefined; // Find all possible variables. The variables are deemed available if they are the same length as the x and y arrays. Also, they must contain only numeric values.

      var compulsory = ["x", "y", "size"];
      var variables = Object.getOwnPropertyNames(surface).filter(function (d) {
        var L_;

        if (!compulsory.includes(d)) {
          // This is a possible user variable. It fits if it is an array of the same length as the geometrical parameters, and if it has numeric values.
          var vals = surface[d];
          L_ = Array.isArray(vals) && !vals.some(isNaN) ? vals.length : undefined;
        } else {
          L_ = undefined;
        } // if
        // The particular variable has to be an array of exactly the same length as `x' and `y'.


        return L_ == L;
      }); // Variables must have at least one option.

      var content_;

      if (variables.length > 0) {
        content_ = {
          variables: variables,
          surface: surface
        };
      } else {
        throw new Error("InvalidFile: Unsupported data structure");
      } // if
      // Hard-coded expected contents


      return content_;
    } // object

  };

  var onDemandFile = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(onDemandFile, _dbsliceFile);

    var _super = _createSuper(onDemandFile);

    function onDemandFile() {
      _classCallCheck(this, onDemandFile);

      return _super.apply(this, arguments);
    }

    _createClass$1(onDemandFile, [{
      key: "onload",
      value: function onload(obj) {
        // During the data formatting the format of the file is determined already. Here just report it onwards.
        return obj;
      } // onload

    }, {
      key: "format",
      value: function format(obj) {
        // Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
        var availableFileClasses = [line2dFile, contour2dFile]; // Here just try to fit the data into all hte supported data formats, and see what works.

        var format;
        availableFileClasses.every(function (fileClass) {
          try {
            // The structure test will throw an error if the content cannot be handled correctly.
            dbsliceFile.test.structure(fileClass, obj.content); // This file class can handle the data.

            format = fileClass.name;
          } catch (_unused) {
            return true;
          } // if

        }); // Output the object, but add it's format to the name.

        if (format) {
          obj.content.format = format;
          return obj;
        } else {
          throw new Error("InvalidFile: Unsupported data structure");
        } // if

      } // format
      // test

    }]);

    return onDemandFile;
  }(dbsliceFile); // onDemandFile


  onDemandFile.test = {
    content: function content() {
      // Any content that can be loaded and passes through the format testing is a valid on-demand file.
      return true;
    } // content

  };

  var supportedVariableTypes = {
    string: {
      supportedCategories: {
        string: ["categorical"],
        datetime: ["categorical", "ordinal"],
        line2dFile: ["categorical", "line2dFile"],
        contour2dFile: ["categorical", "contour2dFile"]
      },
      test: function test(variable, testval, filename) {
        // `variable' needs to be the first input!
        // Return a promise or a fully classified variable.
        var testobj = this;

        switch (testval.split(".").pop()) {
          case "json":
          case "csv":
            // The requester is the metadata file for which the variables are being classified.					
            return testobj.testAsFile(variable, testval, filename);

          default:
            // Unsupported extension - treat as a regular string. A string could be a date.	
            return testobj.testAsDatetime(variable, testval);
        } // switch

      },
      // test
      defaultclassification: function defaultclassification(variable) {
        var testobj = this;
        variable.category = "categorical";
        variable.type = "string";
        variable.supportedCategories = testobj.supportedCategories["string"];
        return variable;
      },
      // defaultclassification
      testAsFile: function testAsFile(variable, testval, requester) {
        // Return fully classified variable object.
        var testobj = this; // Make a testfile object to load the content.

        var testFile = new onDemandFile({
          url: testval,
          filename: testval
        }, requester);
        testFile.load(); // Why Promise.all ??
        // Below 'fileobj' represents 'testFile'.

        return Promise.all([testFile.promise]).then(function (fileobj) {
          // It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
          try {
            // Category is the categorisation that will actually be used, and type cannot be changed.
            variable.category = fileobj[0].content.format;
            variable.type = fileobj[0].content.format;
            variable.supportedCategories = testobj.supportedCategories[variable.type];
            return variable;
          } catch (_unused) {
            // If the loading failed for whatever reason the variable is retained as a categorical.
            return testobj.defaultclassification(variable);
          } // try

        }); // Promise.all().then
      },
      // testAsFile
      testAsDatetime: function testAsDatetime(variable, testval) {
        // But for datetimes it's possible that the row will have mixed formats. In that case it's only fair to allow the variable to be used as a date if all the values can be converted no? Leave as is for now, the others should just return as null, and then that can be handled upon drawing.
        var testobj = this;
        var testdate = testobj.string2datetime(testval);

        if (testdate) {
          variable.category = "ordinal";
          variable.type = "datetime";
          variable.supportedCategories = testobj.supportedCategories["datetime"];
        } else {
          testobj.defaultclassification(variable);
        } // if


        return variable;
      },
      // testAsDatetime
      string2datetime: function string2datetime(testval) {
        /* FORMAT DESIGNATORS
        SECOND
        	%f - microseconds as a decimal number [000000, 999999].
        	%L - milliseconds as a decimal number [000, 999].
        	%Q - milliseconds since UNIX epoch.
        	%s - seconds since UNIX epoch.
        	%S - second as a decimal number [00,61].
        		MINUTE
        	%M - minute as a decimal number [00,59].
        		HOUR
        	%H - hour (24-hour clock) as a decimal number [00,23].
        	%I - hour (12-hour clock) as a decimal number [01,12].
        	%p - either AM or PM.*
        		DAY
        	%a - abbreviated weekday name.*
        	%A - full weekday name.*
        	%j - day of the year as a decimal number [001,366].
        	%d - zero-padded day of the month as a decimal number [01,31].
        	%e - space-padded day of the month as a decimal number [ 1,31];
        	%u - Monday-based (ISO 8601) weekday as a decimal number [1,7].
        	%w - Sunday-based weekday as a decimal number [0,6].
        		WEEK
        	%U - Sunday-based week of the year as a decimal number [00,53].
        	%W - Monday-based week of the year as a decimal number [00,53].
        	%V - ISO 8601 week of the year as a decimal number [01, 53].
        		MONTH
        	%b - abbreviated month name.*
        	%B - full month name.*
        	%m - month as a decimal number [01,12].
        		QUARTER
        	%q - quarter of the year as a decimal number [1,4].
        		YEAR
        	%g - ISO 8601 week-based year without century as a decimal number [00,99].
        	%G - ISO 8601 week-based year with century as a decimal number.
        	%y - year without century as a decimal number [00,99].
        	%Y - year with century as a decimal number, such as 1999.
        		MISC
        	%Z - time zone offset, such as -0700, -07:00, -07, or Z.
        	%% - a literal percent sign (%).
        			%c - the locale’s date and time, such as %x, %X.*
        	%x - the locale’s date, such as %-m/%-d/%Y.*
        	%X - the locale’s time, such as %-I:%M:%S %p.*
        */
        // Four digit year format will successfully read a two digit year input string. Instead of setting bounds on the date just make sure the 2-digit-year format (%y) is tried before the 4-digit-year format (%Y).
        var supportedDatetimeFormats = ["%d/%m/%y", "%d-%m-%y", "%d.%m.%y", "%d/%m/%Y", "%d-%m-%Y", "%d.%m.%Y"];
        var datetime = null; // Can't break out of a forEach... Iterating for(let format in ...) returned the index instead of the string value...

        for (var i = 0; i < supportedDatetimeFormats.length; i++) {
          var format = supportedDatetimeFormats[i];
          var t = d3.timeParse(format);
          datetime = t(testval); // Dates that only have two digits to denote the year are automatically set to the latest year with those two ending digits by d3.timeParse.

          if (datetime) {
            break;
          }
        } // for


        return datetime;
      } // string2datetime

    },
    // string
    number: {
      test: function test(variable) {
        variable.category = "ordinal";
        variable.type = "number";
        variable.supportedCategories = ["ordinal", "categorical"];
        return variable;
      } // test

    } // number

  }; // supportedVariableTypes
  // Maybe I can even move the structure outside here, and remove the need for the static variable?
  // Maybe move the tests outside?

  var metadataFile$1 = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(metadataFile, _dbsliceFile);

    var _super = _createSuper(metadataFile);

    function metadataFile() {
      _classCallCheck(this, metadataFile);

      return _super.apply(this, arguments);
    }

    _createClass$1(metadataFile, [{
      key: "onload",
      value: function onload(obj) {
        // This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
        // The classification is forced now, as categories data is not used anymore. To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.
        var classificationPromise = obj.classifyvariables();
        return classificationPromise;
      } // onload

    }, {
      key: "format",
      value: function format(obj) {
        // Restructure the data into an expected format
        obj.content = dbsliceFile.test.structure(metadataFile, obj.content);
        return obj;
      } // format

    }, {
      key: "classifyvariables",
      value: // structure
      function classifyvariables() {
        var obj = this; // This already executes in a promise chain, therefore it's not needed to update the obj.promise. The promises created here will be resolved before the overhead promise resolves further.
        // Create all the testing promises.

        var testPromises = obj.content.variables.map(function (variable) {
          // Check this column. Variable is now an object!
          return obj.makeVariableClassificationPromise(obj.filename, obj.content.data, variable);
        }); // map
        // Return the final promise.

        return Promise.all(testPromises).then(function (variableClassification) {
          // The promises update the variable classification into the file object directly.
          // If any variables have been identified as datetypes, then convert them all to datetypes here to save the hassle for later.
          obj.content.variables.forEach(function (variable) {
            if (variable.type == "datetime") {
              obj.content.data.forEach(function (row) {
                row[variable.name] = supportedVariableTypes.string.string2datetime(row[variable.name]);
              }); // forEach
            } // if

          }); // forEach

          return obj;
        });
      } // classifyvariables

    }, {
      key: "makeVariableClassificationPromise",
      value: function makeVariableClassificationPromise(filename, data, variable) {
        // Retrieve an actual value already.
        var testrow = dbsliceFile.testrow(data);
        var testval = testrow.row[variable.name]; // Split the testing as per the variable type received.

        var testobj = supportedVariableTypes[_typeof(testval)];

        if (testobj) {
          return testobj.test(variable, testval, filename);
        } else {
          // For any variables without dedicated support.
          variable.category = "unused";
          variable.type = undefined;
          variable.supportedCategories = [];
          return variable;
        } // if

      } // makeVariableClassificationPromise
      // The testing suite for this file type.
      // test

    }]);

    return metadataFile;
  }(dbsliceFile); // metadataFile


  metadataFile$1.structure = {
    csv2metadataFile: function csv2metadataFile(content) {
      var content_; // Data values need to be converted to numbers. Convert the 'variables' into objects?

      content_ = {
        variables: content.columns.map(function (d) {
          return {
            name: d,
            category: undefined,
            type: undefined,
            nunique: unique$1(content.map(function (row) {
              return row[d];
            })).length,
            n: content.length
          };
        }),
        data: dbsliceFile.convertNumbers(content)
      };
      metadataFile$1.test.content(content_);
      delete content_.data.columns;
      return content_;
    },
    // array
    json2metadataFile: function json2metadataFile(content) {
      var content_;
      content_ = {
        variables: Object.getOwnPropertyNames(dbsliceFile.testrow(content.data).row).map(function (d) {
          return {
            name: d,
            category: undefined,
            type: undefined
          };
        }),
        data: content.data
      }; // content_

      metadataFile$1.test.content(content_);
      return content_;
    } // object

  };
  metadataFile$1.test = {
    content: function content(_content) {
      // Columns require a taskId property.
      // Declared categories must contain all variables.
      // All rows must be the same lenght
      // There must be some rows.
      // Data must be iterable
      // Check if the data is an array (has function length)
      var isThereAnyData = Array.isArray(_content.data) && _content.data.length > 0; // Test to make sure all rows have the same number of columns.

      var areRowsConsistent = true;
      var testrow = dbsliceFile.testrow(_content.data).row;

      _content.data.forEach(function (row) {
        arrayEqual(Object.getOwnPropertyNames(testrow), Object.getOwnPropertyNames(row));
      }); // forEach


      return isThereAnyData && areRowsConsistent;
    } // content

  };

  var sessionFile = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(sessionFile, _dbsliceFile);

    var _super = _createSuper(sessionFile);

    function sessionFile() {
      _classCallCheck(this, sessionFile);

      return _super.apply(this, arguments);
    }

    _createClass$1(sessionFile, [{
      key: "format",
      value: function format(obj) {
        obj.content = dbsliceFile.test.structure(sessionFile, obj.content);
        return obj;
      } // format
      // test

    }]);

    return sessionFile;
  }(dbsliceFile); // sessionFile


  sessionFile.structure = {
    // This can now more easily handle different ways of specifying contours. Also convenient to implement the data structure conversion here, e.g. from points to triangles.
    json2sessionFile: function json2sessionFile(content) {
      // Has to be an object, whose entries are valid categories. The entries of the categories are considered the variables after teh merge. Each of them must have the same exact properties (file names), the names must include all the already loaded files, and all the file variables must be present in those files. 
      // Expect two parts to hte file: the merging and session info.
      // What happens when there is no sessionInfo, or nop merging info? Shouldn't it just throw an error??
      // Prune away anything that is not in line with the expected structure. This means categories need to be established ahead of time.
      var mergingInfo = content.mergingInfo; // There are some attributes that the sessionInfo section must have:
      // title, plotRows.

      var sessionInfo = content.sessionInfo;

      if (!arrayIncludesAll(Object.getOwnPropertyNames(sessionInfo), ["title", "plotRows"])) {
        throw new Error("InvalidFile: Session title or rows not specified.");
      } // if


      return {
        merging: mergingInfo,
        session: sessionInfo
      };
    } // object

  };
  sessionFile.test = {
    content: function content(_content) {
      // The philosophy here is that if it can be applied it is valid.
      // Try to use it and see if it'll be fine.
      var fileobjs = dbsliceDataCreation.makeInternalData(fileManager.library.retrieve(metadataFile));
      fileobjs = dbsliceDataCreation.sortByLoadedMergingInfo(fileobjs, _content); // No need to check if all the loaded files were declared for - just use the merge to do what is possible.
      // Maybe the same applies to variables too? Just use what you can?
      // Maybe I don't even need to find common file names??
      // If there's no metadata files loaded then assume they're metadata files.
      // At least some of the 

      return true;
    } // content

  };

  var userFile = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(userFile, _dbsliceFile);

    var _super = _createSuper(userFile);

    function userFile() {
      _classCallCheck(this, userFile);

      return _super.apply(this, arguments);
    }

    _createClass$1(userFile, [{
      key: "onload",
      value: function onload(obj) {
        // Mutate onload.
        var mutatedobj;

        switch (obj.content.format) {
          case "metadataFile":
            // Not easy to mutate, as the format of the content may not be correct.
            mutatedobj = new metadataFile$1(obj);
            mutatedobj.content = {
              data: obj.content.data,
              variables: obj.content.variables
            };
            mutatedobj.promise = mutatedobj.classifyvariables();
            break;

          case "sessionFile":
            // Return the contents as they are.
            mutatedobj = new sessionFile(obj);
            mutatedobj.content = obj.content;
            mutatedobj.promise = obj.promise;
            break;
        } // switch


        return mutatedobj.promise;
      } // onload

    }, {
      key: "format",
      value: function format(obj) {
        // Here try all different ways to format the data. If the formatting succeeds, then check if the contents are fine.
        // SHOULD ALSO ACCEPT SESSION FILES.
        var availableFileClasses = [metadataFile$1, sessionFile]; // Here just try to fit the data into all hte supported data formats, and see what works.

        var content_;
        availableFileClasses.every(function (fileClass) {
          try {
            // The structure test will throw an error if the content cannot be handled correctly.
            content_ = dbsliceFile.test.structure(fileClass, obj.content); // This file class can handle the data.

            content_.format = fileClass.name;
          } catch (_unused) {
            return true;
          } // if

        }); // Output the object, but add it's format to the name.

        if (content_.format) {
          obj.content = content_;
          return obj;
        } else {
          throw new Error("InvalidFile: Unsupported data structure");
        } // if

      } // format

    }, {
      key: "mutateToMetadata",
      value: // test
      function mutateToMetadata(obj) {
        new metadataFile$1(obj); // Refactor the 
      } // mutateToMetadata

    }]);

    return userFile;
  }(dbsliceFile); // userFile


  userFile.test = {
    content: function content() {
      // Any content that can be loaded and passes through the format testing is a valid on-demand file.
      return true;
    } // content

  };

  var dbslicefilelibrary = /*#__PURE__*/function (_filelibrary) {
    _inherits(dbslicefilelibrary, _filelibrary);

    var _super = _createSuper(dbslicefilelibrary);

    function dbslicefilelibrary() {
      _classCallCheck(this, dbslicefilelibrary);

      return _super.call(this);
    } // constructor


    _createClass$1(dbslicefilelibrary, [{
      key: "updateactive",
      value: function updateactive(filenames) {
        var obj = this; // Always keep the metadata files available.

        var allMetadataFilenames = obj.retrieveByClass(metadataFile$1).map(function (fileobj) {
          return fileobj.filename;
        });
        obj.required = allMetadataFilenames.concat(unique$1(filenames));
      } // updateactive

    }, {
      key: "dragdropped",
      value: function dragdropped(files) {
        // Several files may have been dragged and dropped, and they may be of several types (metadata, session).
        var obj = this;
        files.forEach(function (file) {
          obj.single(userFile, file, "drag & drop");
        }); // forEach
      } // dragdropped

    }, {
      key: "ondrop",
      value: function ondrop(ev) {
        var obj = this; // Prevent default behavior (Prevent file from being opened)

        ev.preventDefault();
        var files = [];

        if (ev.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (var i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
              files.push(ev.dataTransfer.items[i].getAsFile());
            } // if

          } // for

        } else {
          // Use DataTransfer interface to access the file(s)
          files = ev.dataTransfer.files;
        } // if


        obj.dragdropped(files);
      } // ondrop

    }, {
      key: "ondragover",
      value: function ondragover(ev) {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
      } // ondragover

    }]);

    return dbslicefilelibrary;
  }(filelibrary); // dbslicefilelibrary

  var noop = {value: () => {}};

  function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
      if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
      _[t] = [];
    }
    return new Dispatch(_);
  }

  function Dispatch(_) {
    this._ = _;
  }

  function parseTypenames$1(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      return {type: t, name: name};
    });
  }

  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
      var _ = this._,
          T = parseTypenames$1(typename + "", _),
          t,
          i = -1,
          n = T.length;

      // If no callback was specified, return the callback of the given type and name.
      if (arguments.length < 2) {
        while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
        return;
      }

      // If a type was specified, set the callback for the given type and name.
      // Otherwise, if a null callback was specified, remove callbacks of the given name.
      if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
      while (++i < n) {
        if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
        else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
      }

      return this;
    },
    copy: function() {
      var copy = {}, _ = this._;
      for (var t in _) copy[t] = _[t].slice();
      return new Dispatch(copy);
    },
    call: function(type, that) {
      if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
      if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
      for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
    }
  };

  function get$1(type, name) {
    for (var i = 0, n = type.length, c; i < n; ++i) {
      if ((c = type[i]).name === name) {
        return c.value;
      }
    }
  }

  function set$1(type, name, callback) {
    for (var i = 0, n = type.length; i < n; ++i) {
      if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
      }
    }
    if (callback != null) type.push({name: name, value: callback});
    return type;
  }

  var xhtml = "http://www.w3.org/1999/xhtml";

  var namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };

  function namespace(name) {
    var prefix = name += "", i = prefix.indexOf(":");
    if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
    return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
  }

  function creatorInherit(name) {
    return function() {
      var document = this.ownerDocument,
          uri = this.namespaceURI;
      return uri === xhtml && document.documentElement.namespaceURI === xhtml
          ? document.createElement(name)
          : document.createElementNS(uri, name);
    };
  }

  function creatorFixed(fullname) {
    return function() {
      return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
  }

  function creator(name) {
    var fullname = namespace(name);
    return (fullname.local
        ? creatorFixed
        : creatorInherit)(fullname);
  }

  function none() {}

  function selector(selector) {
    return selector == null ? none : function() {
      return this.querySelector(selector);
    };
  }

  function selection_select(select) {
    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function array(x) {
    return typeof x === "object" && "length" in x
      ? x // Array, TypedArray, NodeList, array-like
      : Array.from(x); // Map, Set, iterable, string, or anything else
  }

  function empty() {
    return [];
  }

  function selectorAll(selector) {
    return selector == null ? empty : function() {
      return this.querySelectorAll(selector);
    };
  }

  function arrayAll(select) {
    return function() {
      var group = select.apply(this, arguments);
      return group == null ? [] : array(group);
    };
  }

  function selection_selectAll(select) {
    if (typeof select === "function") select = arrayAll(select);
    else select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          subgroups.push(select.call(node, node.__data__, i, group));
          parents.push(node);
        }
      }
    }

    return new Selection$1(subgroups, parents);
  }

  function matcher(selector) {
    return function() {
      return this.matches(selector);
    };
  }

  function childMatcher(selector) {
    return function(node) {
      return node.matches(selector);
    };
  }

  var find = Array.prototype.find;

  function childFind(match) {
    return function() {
      return find.call(this.children, match);
    };
  }

  function childFirst() {
    return this.firstElementChild;
  }

  function selection_selectChild(match) {
    return this.select(match == null ? childFirst
        : childFind(typeof match === "function" ? match : childMatcher(match)));
  }

  var filter = Array.prototype.filter;

  function children() {
    return this.children;
  }

  function childrenFilter(match) {
    return function() {
      return filter.call(this.children, match);
    };
  }

  function selection_selectChildren(match) {
    return this.selectAll(match == null ? children
        : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
  }

  function selection_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Selection$1(subgroups, this._parents);
  }

  function sparse(update) {
    return new Array(update.length);
  }

  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }

  function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
  }

  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
    insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
    querySelector: function(selector) { return this._parent.querySelector(selector); },
    querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
  };

  function constant$2(x) {
    return function() {
      return x;
    };
  }

  function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0,
        node,
        groupLength = group.length,
        dataLength = data.length;

    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for (; i < dataLength; ++i) {
      if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Put any non-null nodes that don’t fit into exit.
    for (; i < groupLength; ++i) {
      if (node = group[i]) {
        exit[i] = node;
      }
    }
  }

  function bindKey(parent, group, enter, update, exit, data, key) {
    var i,
        node,
        nodeByKeyValue = new Map,
        groupLength = group.length,
        dataLength = data.length,
        keyValues = new Array(groupLength),
        keyValue;

    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for (i = 0; i < groupLength; ++i) {
      if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) {
          exit[i] = node;
        } else {
          nodeByKeyValue.set(keyValue, node);
        }
      }
    }

    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for (i = 0; i < dataLength; ++i) {
      keyValue = key.call(parent, data[i], i, data) + "";
      if (node = nodeByKeyValue.get(keyValue)) {
        update[i] = node;
        node.__data__ = data[i];
        nodeByKeyValue.delete(keyValue);
      } else {
        enter[i] = new EnterNode(parent, data[i]);
      }
    }

    // Add any remaining nodes that were not bound to data to exit.
    for (i = 0; i < groupLength; ++i) {
      if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
        exit[i] = node;
      }
    }
  }

  function datum(node) {
    return node.__data__;
  }

  function selection_data(value, key) {
    if (!arguments.length) return Array.from(this, datum);

    var bind = key ? bindKey : bindIndex,
        parents = this._parents,
        groups = this._groups;

    if (typeof value !== "function") value = constant$2(value);

    for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
      var parent = parents[j],
          group = groups[j],
          groupLength = group.length,
          data = array(value.call(parent, parent && parent.__data__, j, parents)),
          dataLength = data.length,
          enterGroup = enter[j] = new Array(dataLength),
          updateGroup = update[j] = new Array(dataLength),
          exitGroup = exit[j] = new Array(groupLength);

      bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

      // Now connect the enter nodes to their following update node, such that
      // appendChild can insert the materialized enter node before this node,
      // rather than at the end of the parent node.
      for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
        if (previous = enterGroup[i0]) {
          if (i0 >= i1) i1 = i0 + 1;
          while (!(next = updateGroup[i1]) && ++i1 < dataLength);
          previous._next = next || null;
        }
      }
    }

    update = new Selection$1(update, parents);
    update._enter = enter;
    update._exit = exit;
    return update;
  }

  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }

  function selection_join(onenter, onupdate, onexit) {
    var enter = this.enter(), update = this, exit = this.exit();
    enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
    if (onupdate != null) update = onupdate(update);
    if (onexit == null) exit.remove(); else onexit(exit);
    return enter && update ? enter.merge(update).order() : update;
  }

  function selection_merge(selection) {
    if (!(selection instanceof Selection$1)) throw new Error("invalid merge");

    for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Selection$1(merges, this._parents);
  }

  function selection_order() {

    for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
      for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
        if (node = group[i]) {
          if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
          next = node;
        }
      }
    }

    return this;
  }

  function selection_sort(compare) {
    if (!compare) compare = ascending;

    function compareNode(a, b) {
      return a && b ? compare(a.__data__, b.__data__) : !a - !b;
    }

    for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          sortgroup[i] = node;
        }
      }
      sortgroup.sort(compareNode);
    }

    return new Selection$1(sortgroups, this._parents).order();
  }

  function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
  }

  function selection_call() {
    var callback = arguments[0];
    arguments[0] = this;
    callback.apply(null, arguments);
    return this;
  }

  function selection_nodes() {
    return Array.from(this);
  }

  function selection_node() {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
        var node = group[i];
        if (node) return node;
      }
    }

    return null;
  }

  function selection_size() {
    let size = 0;
    for (const node of this) ++size; // eslint-disable-line no-unused-vars
    return size;
  }

  function selection_empty() {
    return !this.node();
  }

  function selection_each(callback) {

    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) callback.call(node, node.__data__, i, group);
      }
    }

    return this;
  }

  function attrRemove$1(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS$1(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant$1(name, value) {
    return function() {
      this.setAttribute(name, value);
    };
  }

  function attrConstantNS$1(fullname, value) {
    return function() {
      this.setAttributeNS(fullname.space, fullname.local, value);
    };
  }

  function attrFunction$1(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttribute(name);
      else this.setAttribute(name, v);
    };
  }

  function attrFunctionNS$1(fullname, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
      else this.setAttributeNS(fullname.space, fullname.local, v);
    };
  }

  function selection_attr(name, value) {
    var fullname = namespace(name);

    if (arguments.length < 2) {
      var node = this.node();
      return fullname.local
          ? node.getAttributeNS(fullname.space, fullname.local)
          : node.getAttribute(fullname);
    }

    return this.each((value == null
        ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
        ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
        : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
  }

  function defaultView(node) {
    return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
        || (node.document && node) // node is a Window
        || node.defaultView; // node is a Document
  }

  function styleRemove$1(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant$1(name, value, priority) {
    return function() {
      this.style.setProperty(name, value, priority);
    };
  }

  function styleFunction$1(name, value, priority) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) this.style.removeProperty(name);
      else this.style.setProperty(name, v, priority);
    };
  }

  function selection_style(name, value, priority) {
    return arguments.length > 1
        ? this.each((value == null
              ? styleRemove$1 : typeof value === "function"
              ? styleFunction$1
              : styleConstant$1)(name, value, priority == null ? "" : priority))
        : styleValue(this.node(), name);
  }

  function styleValue(node, name) {
    return node.style.getPropertyValue(name)
        || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
  }

  function propertyRemove(name) {
    return function() {
      delete this[name];
    };
  }

  function propertyConstant(name, value) {
    return function() {
      this[name] = value;
    };
  }

  function propertyFunction(name, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (v == null) delete this[name];
      else this[name] = v;
    };
  }

  function selection_property(name, value) {
    return arguments.length > 1
        ? this.each((value == null
            ? propertyRemove : typeof value === "function"
            ? propertyFunction
            : propertyConstant)(name, value))
        : this.node()[name];
  }

  function classArray(string) {
    return string.trim().split(/^|\s+/);
  }

  function classList(node) {
    return node.classList || new ClassList(node);
  }

  function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
  }

  ClassList.prototype = {
    add: function(name) {
      var i = this._names.indexOf(name);
      if (i < 0) {
        this._names.push(name);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    remove: function(name) {
      var i = this._names.indexOf(name);
      if (i >= 0) {
        this._names.splice(i, 1);
        this._node.setAttribute("class", this._names.join(" "));
      }
    },
    contains: function(name) {
      return this._names.indexOf(name) >= 0;
    }
  };

  function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.add(names[i]);
  }

  function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while (++i < n) list.remove(names[i]);
  }

  function classedTrue(names) {
    return function() {
      classedAdd(this, names);
    };
  }

  function classedFalse(names) {
    return function() {
      classedRemove(this, names);
    };
  }

  function classedFunction(names, value) {
    return function() {
      (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
  }

  function selection_classed(name, value) {
    var names = classArray(name + "");

    if (arguments.length < 2) {
      var list = classList(this.node()), i = -1, n = names.length;
      while (++i < n) if (!list.contains(names[i])) return false;
      return true;
    }

    return this.each((typeof value === "function"
        ? classedFunction : value
        ? classedTrue
        : classedFalse)(names, value));
  }

  function textRemove() {
    this.textContent = "";
  }

  function textConstant$1(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction$1(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.textContent = v == null ? "" : v;
    };
  }

  function selection_text(value) {
    return arguments.length
        ? this.each(value == null
            ? textRemove : (typeof value === "function"
            ? textFunction$1
            : textConstant$1)(value))
        : this.node().textContent;
  }

  function htmlRemove() {
    this.innerHTML = "";
  }

  function htmlConstant(value) {
    return function() {
      this.innerHTML = value;
    };
  }

  function htmlFunction(value) {
    return function() {
      var v = value.apply(this, arguments);
      this.innerHTML = v == null ? "" : v;
    };
  }

  function selection_html(value) {
    return arguments.length
        ? this.each(value == null
            ? htmlRemove : (typeof value === "function"
            ? htmlFunction
            : htmlConstant)(value))
        : this.node().innerHTML;
  }

  function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
  }

  function selection_raise() {
    return this.each(raise);
  }

  function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }

  function selection_lower() {
    return this.each(lower);
  }

  function selection_append(name) {
    var create = typeof name === "function" ? name : creator(name);
    return this.select(function() {
      return this.appendChild(create.apply(this, arguments));
    });
  }

  function constantNull() {
    return null;
  }

  function selection_insert(name, before) {
    var create = typeof name === "function" ? name : creator(name),
        select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
    return this.select(function() {
      return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
    });
  }

  function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
  }

  function selection_remove() {
    return this.each(remove);
  }

  function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
  }

  function selection_clone(deep) {
    return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
  }

  function selection_datum(value) {
    return arguments.length
        ? this.property("__data__", value)
        : this.node().__data__;
  }

  function contextListener(listener) {
    return function(event) {
      listener.call(this, event, this.__data__);
    };
  }

  function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
      var name = "", i = t.indexOf(".");
      if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
      return {type: t, name: name};
    });
  }

  function onRemove(typename) {
    return function() {
      var on = this.__on;
      if (!on) return;
      for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
        if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
        } else {
          on[++i] = o;
        }
      }
      if (++i) on.length = i;
      else delete this.__on;
    };
  }

  function onAdd(typename, value, options) {
    return function() {
      var on = this.__on, o, listener = contextListener(value);
      if (on) for (var j = 0, m = on.length; j < m; ++j) {
        if ((o = on[j]).type === typename.type && o.name === typename.name) {
          this.removeEventListener(o.type, o.listener, o.options);
          this.addEventListener(o.type, o.listener = listener, o.options = options);
          o.value = value;
          return;
        }
      }
      this.addEventListener(typename.type, listener, options);
      o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
      if (!on) this.__on = [o];
      else on.push(o);
    };
  }

  function selection_on(typename, value, options) {
    var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

    if (arguments.length < 2) {
      var on = this.node().__on;
      if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
        for (i = 0, o = on[j]; i < n; ++i) {
          if ((t = typenames[i]).type === o.type && t.name === o.name) {
            return o.value;
          }
        }
      }
      return;
    }

    on = value ? onAdd : onRemove;
    for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
    return this;
  }

  function dispatchEvent(node, type, params) {
    var window = defaultView(node),
        event = window.CustomEvent;

    if (typeof event === "function") {
      event = new event(type, params);
    } else {
      event = window.document.createEvent("Event");
      if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
      else event.initEvent(type, false, false);
    }

    node.dispatchEvent(event);
  }

  function dispatchConstant(type, params) {
    return function() {
      return dispatchEvent(this, type, params);
    };
  }

  function dispatchFunction(type, params) {
    return function() {
      return dispatchEvent(this, type, params.apply(this, arguments));
    };
  }

  function selection_dispatch(type, params) {
    return this.each((typeof params === "function"
        ? dispatchFunction
        : dispatchConstant)(type, params));
  }

  function* selection_iterator() {
    for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
      for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
        if (node = group[i]) yield node;
      }
    }
  }

  var root = [null];

  function Selection$1(groups, parents) {
    this._groups = groups;
    this._parents = parents;
  }

  function selection() {
    return new Selection$1([[document.documentElement]], root);
  }

  function selection_selection() {
    return this;
  }

  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };

  function select(selector) {
    return typeof selector === "string"
        ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
        : new Selection$1([[selector]], root);
  }

  function sourceEvent(event) {
    let sourceEvent;
    while (sourceEvent = event.sourceEvent) event = sourceEvent;
    return event;
  }

  function pointer(event, node) {
    event = sourceEvent(event);
    if (node === undefined) node = event.currentTarget;
    if (node) {
      var svg = node.ownerSVGElement || node;
      if (svg.createSVGPoint) {
        var point = svg.createSVGPoint();
        point.x = event.clientX, point.y = event.clientY;
        point = point.matrixTransform(node.getScreenCTM().inverse());
        return [point.x, point.y];
      }
      if (node.getBoundingClientRect) {
        var rect = node.getBoundingClientRect();
        return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
      }
    }
    return [event.pageX, event.pageY];
  }

  function nopropagation(event) {
    event.stopImmediatePropagation();
  }

  function noevent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  function dragDisable(view) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", noevent, true);
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", noevent, true);
    } else {
      root.__noselect = root.style.MozUserSelect;
      root.style.MozUserSelect = "none";
    }
  }

  function yesdrag(view, noclick) {
    var root = view.document.documentElement,
        selection = select(view).on("dragstart.drag", null);
    if (noclick) {
      selection.on("click.drag", noevent, true);
      setTimeout(function() { selection.on("click.drag", null); }, 0);
    }
    if ("onselectstart" in root) {
      selection.on("selectstart.drag", null);
    } else {
      root.style.MozUserSelect = root.__noselect;
      delete root.__noselect;
    }
  }

  var constant$1 = x => () => x;

  function DragEvent(type, {
    sourceEvent,
    subject,
    target,
    identifier,
    active,
    x, y, dx, dy,
    dispatch
  }) {
    Object.defineProperties(this, {
      type: {value: type, enumerable: true, configurable: true},
      sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
      subject: {value: subject, enumerable: true, configurable: true},
      target: {value: target, enumerable: true, configurable: true},
      identifier: {value: identifier, enumerable: true, configurable: true},
      active: {value: active, enumerable: true, configurable: true},
      x: {value: x, enumerable: true, configurable: true},
      y: {value: y, enumerable: true, configurable: true},
      dx: {value: dx, enumerable: true, configurable: true},
      dy: {value: dy, enumerable: true, configurable: true},
      _: {value: dispatch}
    });
  }

  DragEvent.prototype.on = function() {
    var value = this._.on.apply(this._, arguments);
    return value === this._ ? this : value;
  };

  // Ignore right-click, since that should open the context menu.
  function defaultFilter(event) {
    return !event.ctrlKey && !event.button;
  }

  function defaultContainer() {
    return this.parentNode;
  }

  function defaultSubject(event, d) {
    return d == null ? {x: event.x, y: event.y} : d;
  }

  function defaultTouchable() {
    return navigator.maxTouchPoints || ("ontouchstart" in this);
  }

  function drag() {
    var filter = defaultFilter,
        container = defaultContainer,
        subject = defaultSubject,
        touchable = defaultTouchable,
        gestures = {},
        listeners = dispatch("start", "drag", "end"),
        active = 0,
        mousedownx,
        mousedowny,
        mousemoving,
        touchending,
        clickDistance2 = 0;

    function drag(selection) {
      selection
          .on("mousedown.drag", mousedowned)
        .filter(touchable)
          .on("touchstart.drag", touchstarted)
          .on("touchmove.drag", touchmoved)
          .on("touchend.drag touchcancel.drag", touchended)
          .style("touch-action", "none")
          .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
    }

    function mousedowned(event, d) {
      if (touchending || !filter.call(this, event, d)) return;
      var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
      if (!gesture) return;
      select(event.view).on("mousemove.drag", mousemoved, true).on("mouseup.drag", mouseupped, true);
      dragDisable(event.view);
      nopropagation(event);
      mousemoving = false;
      mousedownx = event.clientX;
      mousedowny = event.clientY;
      gesture("start", event);
    }

    function mousemoved(event) {
      noevent(event);
      if (!mousemoving) {
        var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
        mousemoving = dx * dx + dy * dy > clickDistance2;
      }
      gestures.mouse("drag", event);
    }

    function mouseupped(event) {
      select(event.view).on("mousemove.drag mouseup.drag", null);
      yesdrag(event.view, mousemoving);
      noevent(event);
      gestures.mouse("end", event);
    }

    function touchstarted(event, d) {
      if (!filter.call(this, event, d)) return;
      var touches = event.changedTouches,
          c = container.call(this, event, d),
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
          nopropagation(event);
          gesture("start", event, touches[i]);
        }
      }
    }

    function touchmoved(event) {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          noevent(event);
          gesture("drag", event, touches[i]);
        }
      }
    }

    function touchended(event) {
      var touches = event.changedTouches,
          n = touches.length, i, gesture;

      if (touchending) clearTimeout(touchending);
      touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
      for (i = 0; i < n; ++i) {
        if (gesture = gestures[touches[i].identifier]) {
          nopropagation(event);
          gesture("end", event, touches[i]);
        }
      }
    }

    function beforestart(that, container, event, d, identifier, touch) {
      var dispatch = listeners.copy(),
          p = pointer(touch || event, container), dx, dy,
          s;

      if ((s = subject.call(that, new DragEvent("beforestart", {
          sourceEvent: event,
          target: drag,
          identifier,
          active,
          x: p[0],
          y: p[1],
          dx: 0,
          dy: 0,
          dispatch
        }), d)) == null) return;

      dx = s.x - p[0] || 0;
      dy = s.y - p[1] || 0;

      return function gesture(type, event, touch) {
        var p0 = p, n;
        switch (type) {
          case "start": gestures[identifier] = gesture, n = active++; break;
          case "end": delete gestures[identifier], --active; // nobreak
          case "drag": p = pointer(touch || event, container), n = active; break;
        }
        dispatch.call(
          type,
          that,
          new DragEvent(type, {
            sourceEvent: event,
            subject: s,
            target: drag,
            identifier,
            active: n,
            x: p[0] + dx,
            y: p[1] + dy,
            dx: p[0] - p0[0],
            dy: p[1] - p0[1],
            dispatch
          }),
          d
        );
      };
    }

    drag.filter = function(_) {
      return arguments.length ? (filter = typeof _ === "function" ? _ : constant$1(!!_), drag) : filter;
    };

    drag.container = function(_) {
      return arguments.length ? (container = typeof _ === "function" ? _ : constant$1(_), drag) : container;
    };

    drag.subject = function(_) {
      return arguments.length ? (subject = typeof _ === "function" ? _ : constant$1(_), drag) : subject;
    };

    drag.touchable = function(_) {
      return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$1(!!_), drag) : touchable;
    };

    drag.on = function() {
      var value = listeners.on.apply(listeners, arguments);
      return value === listeners ? drag : value;
    };

    drag.clickDistance = function(_) {
      return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
    };

    return drag;
  }

  function define(constructor, factory, prototype) {
    constructor.prototype = factory.prototype = prototype;
    prototype.constructor = constructor;
  }

  function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for (var key in definition) prototype[key] = definition[key];
    return prototype;
  }

  function Color() {}

  var darker = 0.7;
  var brighter = 1 / darker;

  var reI = "\\s*([+-]?\\d+)\\s*",
      reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
      reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
      reHex = /^#([0-9a-f]{3,8})$/,
      reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
      reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
      reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
      reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
      reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
      reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

  var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
  };

  define(Color, color, {
    copy: function(channels) {
      return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
      return this.rgb().displayable();
    },
    hex: color_formatHex, // Deprecated! Use color.formatHex.
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });

  function color_formatHex() {
    return this.rgb().formatHex();
  }

  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }

  function color_formatRgb() {
    return this.rgb().formatRgb();
  }

  function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
        : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
        : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
        : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
        : null) // invalid hex
        : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
        : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
        : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
        : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
        : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
        : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
        : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
        : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
        : null;
  }

  function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
  }

  function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
  }

  function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
  }

  function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
  }

  function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
  }

  define(Rgb, rgb, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
      return this;
    },
    displayable: function() {
      return (-0.5 <= this.r && this.r < 255.5)
          && (-0.5 <= this.g && this.g < 255.5)
          && (-0.5 <= this.b && this.b < 255.5)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    hex: rgb_formatHex, // Deprecated! Use color.formatHex.
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));

  function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
  }

  function rgb_formatRgb() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(")
        + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
        + Math.max(0, Math.min(255, Math.round(this.b) || 0))
        + (a === 1 ? ")" : ", " + a + ")");
  }

  function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
  }

  function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
  }

  function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255,
        g = o.g / 255,
        b = o.b / 255,
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        h = NaN,
        s = max - min,
        l = (max + min) / 2;
    if (s) {
      if (r === max) h = (g - b) / s + (g < b) * 6;
      else if (g === max) h = (b - r) / s + 2;
      else h = (r - g) / s + 4;
      s /= l < 0.5 ? max + min : 2 - max - min;
      h *= 60;
    } else {
      s = l > 0 && l < 1 ? 0 : h;
    }
    return new Hsl(h, s, l, o.opacity);
  }

  function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
  }

  function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
  }

  define(Hsl, hsl, extend(Color, {
    brighter: function(k) {
      k = k == null ? brighter : Math.pow(brighter, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
      k = k == null ? darker : Math.pow(darker, k);
      return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
      var h = this.h % 360 + (this.h < 0) * 360,
          s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
          l = this.l,
          m2 = l + (l < 0.5 ? l : 1 - l) * s,
          m1 = 2 * l - m2;
      return new Rgb(
        hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
        hsl2rgb(h, m1, m2),
        hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
        this.opacity
      );
    },
    displayable: function() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s))
          && (0 <= this.l && this.l <= 1)
          && (0 <= this.opacity && this.opacity <= 1);
    },
    formatHsl: function() {
      var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
      return (a === 1 ? "hsl(" : "hsla(")
          + (this.h || 0) + ", "
          + (this.s || 0) * 100 + "%, "
          + (this.l || 0) * 100 + "%"
          + (a === 1 ? ")" : ", " + a + ")");
    }
  }));

  /* From FvD 13.37, CSS Color Module Level 3 */
  function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60
        : h < 180 ? m2
        : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
        : m1) * 255;
  }

  var constant = x => () => x;

  function linear(a, d) {
    return function(t) {
      return a + t * d;
    };
  }

  function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
      return Math.pow(a + t * b, y);
    };
  }

  function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
      return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
    };
  }

  function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : constant(isNaN(a) ? b : a);
  }

  var interpolateRgb = (function rgbGamma(y) {
    var color = gamma(y);

    function rgb$1(start, end) {
      var r = color((start = rgb(start)).r, (end = rgb(end)).r),
          g = color(start.g, end.g),
          b = color(start.b, end.b),
          opacity = nogamma(start.opacity, end.opacity);
      return function(t) {
        start.r = r(t);
        start.g = g(t);
        start.b = b(t);
        start.opacity = opacity(t);
        return start + "";
      };
    }

    rgb$1.gamma = rgbGamma;

    return rgb$1;
  })(1);

  function interpolateNumber(a, b) {
    return a = +a, b = +b, function(t) {
      return a * (1 - t) + b * t;
    };
  }

  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      reB = new RegExp(reA.source, "g");

  function zero(b) {
    return function() {
      return b;
    };
  }

  function one(b) {
    return function(t) {
      return b(t) + "";
    };
  }

  function interpolateString(a, b) {
    var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
        am, // current match in a
        bm, // current match in b
        bs, // string preceding current number in b, if any
        i = -1, // index in s
        s = [], // string constants and placeholders
        q = []; // number interpolators

    // Coerce inputs to strings.
    a = a + "", b = b + "";

    // Interpolate pairs of numbers in a & b.
    while ((am = reA.exec(a))
        && (bm = reB.exec(b))) {
      if ((bs = bm.index) > bi) { // a string precedes the next number in b
        bs = b.slice(bi, bs);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }
      if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
        if (s[i]) s[i] += bm; // coalesce with previous string
        else s[++i] = bm;
      } else { // interpolate non-matching numbers
        s[++i] = null;
        q.push({i: i, x: interpolateNumber(am, bm)});
      }
      bi = reB.lastIndex;
    }

    // Add remains of b.
    if (bi < b.length) {
      bs = b.slice(bi);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }

    // Special optimization for only a single match.
    // Otherwise, interpolate each of the numbers and rejoin the string.
    return s.length < 2 ? (q[0]
        ? one(q[0].x)
        : zero(b))
        : (b = q.length, function(t) {
            for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
            return s.join("");
          });
  }

  var degrees = 180 / Math.PI;

  var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };

  function decompose(a, b, c, d, e, f) {
    var scaleX, scaleY, skewX;
    if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
    if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
    if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
    if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
    return {
      translateX: e,
      translateY: f,
      rotate: Math.atan2(b, a) * degrees,
      skewX: Math.atan(skewX) * degrees,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var svgNode;

  /* eslint-disable no-undef */
  function parseCss(value) {
    const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
    return m.isIdentity ? identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
  }

  function parseSvg(value) {
    if (value == null) return identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
    value = value.matrix;
    return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
  }

  function interpolateTransform(parse, pxComma, pxParen, degParen) {

    function pop(s) {
      return s.length ? s.pop() + " " : "";
    }

    function translate(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push("translate(", null, pxComma, null, pxParen);
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb || yb) {
        s.push("translate(" + xb + pxComma + yb + pxParen);
      }
    }

    function rotate(a, b, s, q) {
      if (a !== b) {
        if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
        q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "rotate(" + b + degParen);
      }
    }

    function skewX(a, b, s, q) {
      if (a !== b) {
        q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
      } else if (b) {
        s.push(pop(s) + "skewX(" + b + degParen);
      }
    }

    function scale(xa, ya, xb, yb, s, q) {
      if (xa !== xb || ya !== yb) {
        var i = s.push(pop(s) + "scale(", null, ",", null, ")");
        q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
      } else if (xb !== 1 || yb !== 1) {
        s.push(pop(s) + "scale(" + xb + "," + yb + ")");
      }
    }

    return function(a, b) {
      var s = [], // string constants and placeholders
          q = []; // number interpolators
      a = parse(a), b = parse(b);
      translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
      rotate(a.rotate, b.rotate, s, q);
      skewX(a.skewX, b.skewX, s, q);
      scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
      a = b = null; // gc
      return function(t) {
        var i = -1, n = q.length, o;
        while (++i < n) s[(o = q[i]).i] = o.x(t);
        return s.join("");
      };
    };
  }

  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
  var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

  var frame = 0, // is an animation frame pending?
      timeout$1 = 0, // is a timeout pending?
      interval = 0, // are any timers active?
      pokeDelay = 1000, // how frequently we check for clock skew
      taskHead,
      taskTail,
      clockLast = 0,
      clockNow = 0,
      clockSkew = 0,
      clock = typeof performance === "object" && performance.now ? performance : Date,
      setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }

  function clearNow() {
    clockNow = 0;
  }

  function Timer() {
    this._call =
    this._time =
    this._next = null;
  }

  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
      if (typeof callback !== "function") throw new TypeError("callback is not a function");
      time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
      if (!this._next && taskTail !== this) {
        if (taskTail) taskTail._next = this;
        else taskHead = this;
        taskTail = this;
      }
      this._call = callback;
      this._time = time;
      sleep();
    },
    stop: function() {
      if (this._call) {
        this._call = null;
        this._time = Infinity;
        sleep();
      }
    }
  };

  function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
  }

  function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while (t) {
      if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
      t = t._next;
    }
    --frame;
  }

  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame = 0;
      nap();
      clockNow = 0;
    }
  }

  function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
  }

  function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while (t1) {
      if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
      } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
      }
    }
    taskTail = t0;
    sleep(time);
  }

  function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout$1) timeout$1 = clearTimeout(timeout$1);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
      if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
      if (interval) interval = clearInterval(interval);
    } else {
      if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
      frame = 1, setFrame(wake);
    }
  }

  function timeout(callback, delay, time) {
    var t = new Timer;
    delay = delay == null ? 0 : +delay;
    t.restart(elapsed => {
      t.stop();
      callback(elapsed + delay);
    }, delay, time);
    return t;
  }

  var emptyOn = dispatch("start", "end", "cancel", "interrupt");
  var emptyTween = [];

  var CREATED = 0;
  var SCHEDULED = 1;
  var STARTING = 2;
  var STARTED = 3;
  var RUNNING = 4;
  var ENDING = 5;
  var ENDED = 6;

  function schedule(node, name, id, index, group, timing) {
    var schedules = node.__transition;
    if (!schedules) node.__transition = {};
    else if (id in schedules) return;
    create(node, id, {
      name: name,
      index: index, // For context during callback.
      group: group, // For context during callback.
      on: emptyOn,
      tween: emptyTween,
      time: timing.time,
      delay: timing.delay,
      duration: timing.duration,
      ease: timing.ease,
      timer: null,
      state: CREATED
    });
  }

  function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
  }

  function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
  }

  function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
  }

  function create(node, id, self) {
    var schedules = node.__transition,
        tween;

    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = timer(schedule, 0, self.time);

    function schedule(elapsed) {
      self.state = SCHEDULED;
      self.timer.restart(start, self.delay, self.time);

      // If the elapsed delay is less than our first sleep, start immediately.
      if (self.delay <= elapsed) start(elapsed - self.delay);
    }

    function start(elapsed) {
      var i, j, n, o;

      // If the state is not SCHEDULED, then we previously errored on start.
      if (self.state !== SCHEDULED) return stop();

      for (i in schedules) {
        o = schedules[i];
        if (o.name !== self.name) continue;

        // While this element already has a starting transition during this frame,
        // defer starting an interrupting transition until that transition has a
        // chance to tick (and possibly end); see d3/d3-transition#54!
        if (o.state === STARTED) return timeout(start);

        // Interrupt the active transition, if any.
        if (o.state === RUNNING) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("interrupt", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }

        // Cancel any pre-empted transitions.
        else if (+i < id) {
          o.state = ENDED;
          o.timer.stop();
          o.on.call("cancel", node, node.__data__, o.index, o.group);
          delete schedules[i];
        }
      }

      // Defer the first tick to end of the current frame; see d3/d3#1576.
      // Note the transition may be canceled after start and before the first tick!
      // Note this must be scheduled before the start event; see d3/d3-transition#16!
      // Assuming this is successful, subsequent callbacks go straight to tick.
      timeout(function() {
        if (self.state === STARTED) {
          self.state = RUNNING;
          self.timer.restart(tick, self.delay, self.time);
          tick(elapsed);
        }
      });

      // Dispatch the start event.
      // Note this must be done before the tween are initialized.
      self.state = STARTING;
      self.on.call("start", node, node.__data__, self.index, self.group);
      if (self.state !== STARTING) return; // interrupted
      self.state = STARTED;

      // Initialize the tween, deleting null tween.
      tween = new Array(n = self.tween.length);
      for (i = 0, j = -1; i < n; ++i) {
        if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
          tween[++j] = o;
        }
      }
      tween.length = j + 1;
    }

    function tick(elapsed) {
      var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
          i = -1,
          n = tween.length;

      while (++i < n) {
        tween[i].call(node, t);
      }

      // Dispatch the end event.
      if (self.state === ENDING) {
        self.on.call("end", node, node.__data__, self.index, self.group);
        stop();
      }
    }

    function stop() {
      self.state = ENDED;
      self.timer.stop();
      delete schedules[id];
      for (var i in schedules) return; // eslint-disable-line no-unused-vars
      delete node.__transition;
    }
  }

  function interrupt(node, name) {
    var schedules = node.__transition,
        schedule,
        active,
        empty = true,
        i;

    if (!schedules) return;

    name = name == null ? null : name + "";

    for (i in schedules) {
      if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
      active = schedule.state > STARTING && schedule.state < ENDING;
      schedule.state = ENDED;
      schedule.timer.stop();
      schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
      delete schedules[i];
    }

    if (empty) delete node.__transition;
  }

  function selection_interrupt(name) {
    return this.each(function() {
      interrupt(this, name);
    });
  }

  function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = tween0 = tween;
        for (var i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1 = tween1.slice();
            tween1.splice(i, 1);
            break;
          }
        }
      }

      schedule.tween = tween1;
    };
  }

  function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
      var schedule = set(this, id),
          tween = schedule.tween;

      // If this node shared tween with the previous node,
      // just assign the updated shared tween and we’re done!
      // Otherwise, copy-on-write.
      if (tween !== tween0) {
        tween1 = (tween0 = tween).slice();
        for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
          if (tween1[i].name === name) {
            tween1[i] = t;
            break;
          }
        }
        if (i === n) tween1.push(t);
      }

      schedule.tween = tween1;
    };
  }

  function transition_tween(name, value) {
    var id = this._id;

    name += "";

    if (arguments.length < 2) {
      var tween = get(this.node(), id).tween;
      for (var i = 0, n = tween.length, t; i < n; ++i) {
        if ((t = tween[i]).name === name) {
          return t.value;
        }
      }
      return null;
    }

    return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
  }

  function tweenValue(transition, name, value) {
    var id = transition._id;

    transition.each(function() {
      var schedule = set(this, id);
      (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });

    return function(node) {
      return get(node, id).value[name];
    };
  }

  function interpolate(a, b) {
    var c;
    return (typeof b === "number" ? interpolateNumber
        : b instanceof color ? interpolateRgb
        : (c = color(b)) ? (b = c, interpolateRgb)
        : interpolateString)(a, b);
  }

  function attrRemove(name) {
    return function() {
      this.removeAttribute(name);
    };
  }

  function attrRemoveNS(fullname) {
    return function() {
      this.removeAttributeNS(fullname.space, fullname.local);
    };
  }

  function attrConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttribute(name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrConstantNS(fullname, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = this.getAttributeNS(fullname.space, fullname.local);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function attrFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttribute(name);
      string0 = this.getAttribute(name);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function attrFunctionNS(fullname, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0, value1 = value(this), string1;
      if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
      string0 = this.getAttributeNS(fullname.space, fullname.local);
      string1 = value1 + "";
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function transition_attr(name, value) {
    var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(name, typeof value === "function"
        ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
        : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
        : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
  }

  function attrInterpolate(name, i) {
    return function(t) {
      this.setAttribute(name, i.call(this, t));
    };
  }

  function attrInterpolateNS(fullname, i) {
    return function(t) {
      this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
  }

  function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function attrTween(name, value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_attrTween(name, value) {
    var key = "attr." + name;
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    var fullname = namespace(name);
    return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
  }

  function delayFunction(id, value) {
    return function() {
      init(this, id).delay = +value.apply(this, arguments);
    };
  }

  function delayConstant(id, value) {
    return value = +value, function() {
      init(this, id).delay = value;
    };
  }

  function transition_delay(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? delayFunction
            : delayConstant)(id, value))
        : get(this.node(), id).delay;
  }

  function durationFunction(id, value) {
    return function() {
      set(this, id).duration = +value.apply(this, arguments);
    };
  }

  function durationConstant(id, value) {
    return value = +value, function() {
      set(this, id).duration = value;
    };
  }

  function transition_duration(value) {
    var id = this._id;

    return arguments.length
        ? this.each((typeof value === "function"
            ? durationFunction
            : durationConstant)(id, value))
        : get(this.node(), id).duration;
  }

  function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
      set(this, id).ease = value;
    };
  }

  function transition_ease(value) {
    var id = this._id;

    return arguments.length
        ? this.each(easeConstant(id, value))
        : get(this.node(), id).ease;
  }

  function easeVarying(id, value) {
    return function() {
      var v = value.apply(this, arguments);
      if (typeof v !== "function") throw new Error;
      set(this, id).ease = v;
    };
  }

  function transition_easeVarying(value) {
    if (typeof value !== "function") throw new Error;
    return this.each(easeVarying(this._id, value));
  }

  function transition_filter(match) {
    if (typeof match !== "function") match = matcher(match);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
        if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
          subgroup.push(node);
        }
      }
    }

    return new Transition(subgroups, this._parents, this._name, this._id);
  }

  function transition_merge(transition) {
    if (transition._id !== this._id) throw new Error;

    for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
      for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
        if (node = group0[i] || group1[i]) {
          merge[i] = node;
        }
      }
    }

    for (; j < m0; ++j) {
      merges[j] = groups0[j];
    }

    return new Transition(merges, this._parents, this._name, this._id);
  }

  function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
      var i = t.indexOf(".");
      if (i >= 0) t = t.slice(0, i);
      return !t || t === "start";
    });
  }

  function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? init : set;
    return function() {
      var schedule = sit(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

      schedule.on = on1;
    };
  }

  function transition_on(name, listener) {
    var id = this._id;

    return arguments.length < 2
        ? get(this.node(), id).on.on(name)
        : this.each(onFunction(id, name, listener));
  }

  function removeFunction(id) {
    return function() {
      var parent = this.parentNode;
      for (var i in this.__transition) if (+i !== id) return;
      if (parent) parent.removeChild(this);
    };
  }

  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }

  function transition_select(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selector(select);

    for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
        if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
          if ("__data__" in node) subnode.__data__ = node.__data__;
          subgroup[i] = subnode;
          schedule(subgroup[i], name, id, i, subgroup, get(node, id));
        }
      }
    }

    return new Transition(subgroups, this._parents, name, id);
  }

  function transition_selectAll(select) {
    var name = this._name,
        id = this._id;

    if (typeof select !== "function") select = selectorAll(select);

    for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
            if (child = children[k]) {
              schedule(child, name, id, k, children, inherit);
            }
          }
          subgroups.push(children);
          parents.push(node);
        }
      }
    }

    return new Transition(subgroups, parents, name, id);
  }

  var Selection = selection.prototype.constructor;

  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }

  function styleNull(name, interpolate) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          string1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
  }

  function styleRemove(name) {
    return function() {
      this.style.removeProperty(name);
    };
  }

  function styleConstant(name, interpolate, value1) {
    var string00,
        string1 = value1 + "",
        interpolate0;
    return function() {
      var string0 = styleValue(this, name);
      return string0 === string1 ? null
          : string0 === string00 ? interpolate0
          : interpolate0 = interpolate(string00 = string0, value1);
    };
  }

  function styleFunction(name, interpolate, value) {
    var string00,
        string10,
        interpolate0;
    return function() {
      var string0 = styleValue(this, name),
          value1 = value(this),
          string1 = value1 + "";
      if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
      return string0 === string1 ? null
          : string0 === string00 && string1 === string10 ? interpolate0
          : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
  }

  function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
      var schedule = set(this, id),
          on = schedule.on,
          listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

      schedule.on = on1;
    };
  }

  function transition_style(name, value, priority) {
    var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
    return value == null ? this
        .styleTween(name, styleNull(name, i))
        .on("end.style." + name, styleRemove(name))
      : typeof value === "function" ? this
        .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
        .each(styleMaybeRemove(this._id, name))
      : this
        .styleTween(name, styleConstant(name, i, value), priority)
        .on("end.style." + name, null);
  }

  function styleInterpolate(name, i, priority) {
    return function(t) {
      this.style.setProperty(name, i.call(this, t), priority);
    };
  }

  function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
      return t;
    }
    tween._value = value;
    return tween;
  }

  function transition_styleTween(name, value, priority) {
    var key = "style." + (name += "");
    if (arguments.length < 2) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
  }

  function textConstant(value) {
    return function() {
      this.textContent = value;
    };
  }

  function textFunction(value) {
    return function() {
      var value1 = value(this);
      this.textContent = value1 == null ? "" : value1;
    };
  }

  function transition_text(value) {
    return this.tween("text", typeof value === "function"
        ? textFunction(tweenValue(this, "text", value))
        : textConstant(value == null ? "" : value + ""));
  }

  function textInterpolate(i) {
    return function(t) {
      this.textContent = i.call(this, t);
    };
  }

  function textTween(value) {
    var t0, i0;
    function tween() {
      var i = value.apply(this, arguments);
      if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
      return t0;
    }
    tween._value = value;
    return tween;
  }

  function transition_textTween(value) {
    var key = "text";
    if (arguments.length < 1) return (key = this.tween(key)) && key._value;
    if (value == null) return this.tween(key, null);
    if (typeof value !== "function") throw new Error;
    return this.tween(key, textTween(value));
  }

  function transition_transition() {
    var name = this._name,
        id0 = this._id,
        id1 = newId();

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          var inherit = get(node, id0);
          schedule(node, name, id1, i, group, {
            time: inherit.time + inherit.delay + inherit.duration,
            delay: 0,
            duration: inherit.duration,
            ease: inherit.ease
          });
        }
      }
    }

    return new Transition(groups, this._parents, name, id1);
  }

  function transition_end() {
    var on0, on1, that = this, id = that._id, size = that.size();
    return new Promise(function(resolve, reject) {
      var cancel = {value: reject},
          end = {value: function() { if (--size === 0) resolve(); }};

      that.each(function() {
        var schedule = set(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) {
          on1 = (on0 = on).copy();
          on1._.cancel.push(cancel);
          on1._.interrupt.push(cancel);
          on1._.end.push(end);
        }

        schedule.on = on1;
      });

      // The selection was empty, resolve end immediately
      if (size === 0) resolve();
    });
  }

  var id = 0;

  function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
  }

  function newId() {
    return ++id;
  }

  var selection_prototype = selection.prototype;

  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };

  function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
  }

  var defaultTiming = {
    time: null, // Set on use.
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };

  function inherit(node, id) {
    var timing;
    while (!(timing = node.__transition) || !(timing = timing[id])) {
      if (!(node = node.parentNode)) {
        throw new Error(`transition ${id} not found`);
      }
    }
    return timing;
  }

  function selection_transition(name) {
    var id,
        timing;

    if (name instanceof Transition) {
      id = name._id, name = name._name;
    } else {
      id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
    }

    for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
      for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
        if (node = group[i]) {
          schedule(node, name, id, i, group, timing || inherit(node, id));
        }
      }
    }

    return new Transition(groups, this._parents, name, id);
  }

  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;

  // A = new dragdiv() ...

  var dragnode = /*#__PURE__*/function () {
    function dragnode(node) {
      _classCallCheck(this, dragnode); // Make a new div.


      var obj = this;
      obj.node = node;
      obj.d3node = select(node);
      obj.d3node.style("position", "relative").style("left", 0 + "px").style("top", 0 + "px"); // Container that will hold the mouse coordinates.

      obj.mouseorigin = {};
    } // constructor


    _createClass$1(dragnode, [{
      key: "apply",
      value: function apply() {
        var obj = this; // Apply dragging to it. Store the movement data on the dragdiv object instead? So as to not pollute the actual object?

        var dragobj = drag().on("start", function (event) {
          obj.mouseorigin = obj.mouseposition(event);
          obj.onstart();
        }).on("drag", function (event) {
          // let position = obj.position()
          var movement = obj.movement(event); // Rounding positions to full pixel value hasn't helped much. Maybe it's the css holding everything back?
          // Move the wrapper.

          obj.d3node.style("left", obj.position.x + movement.x + "px").style("top", obj.position.y + movement.y + "px"); // Update the last mouse position

          obj.mouseorigin = obj.mouseposition(event);
          obj.ondrag();
        }).on("end", function (event) {
          // The parent should update it's position automatically. How do I do that? Maybe the parent should listen to some action? Or maybe it's position should just be calculated when it's needed?
          obj.onend();
        });
        obj.d3node.call(dragobj);
      } // apply

    }, {
      key: "position",
      get: function get() {
        // Get the position of the dragdiv.
        var obj = this;
        return {
          x: parseInt(obj.node.style.left),
          y: parseInt(obj.node.style.top),
          w: obj.node.offsetWidth,
          h: obj.node.offsetHeight
        };
      } // position

    }, {
      key: "movement",
      value: function movement(event) {
        // Get the delta of the movement from hte origin to the current mouse position.
        var obj = this;
        var origin = obj.mouseorigin;
        var current = obj.mouseposition(event);
        return {
          x: current.x - origin.x,
          y: current.y - origin.y
        };
      } // movement

    }, {
      key: "mouseposition",
      value: function mouseposition(event) {
        return {
          x: event.sourceEvent.clientX,
          y: event.sourceEvent.clientY
        };
      } // mouseposition
      // Dummy functionality.

    }, {
      key: "onstart",
      value: function onstart() {
      } // onstart

    }, {
      key: "ondrag",
      value: function ondrag() {
      } // ondrag

    }, {
      key: "onend",
      value: function onend() {
      } // onend

    }]);

    return dragnode;
  }(); // dragdiv

  /*
  The css is held in js form to allow the modules just be imported in the javascript, without having to add the css to the document separately.

  Another version of adding the css is to specify it in javascript objects, and when appending the html elements also append the styles. Just adding the styles directly is more simple for hte time being though.

  COMMON: card, btn
  METADATAMENU: fullscreenContainer, cardTitle
  ERRORREPORT: btn{Submit}
  METADATA MERGER: btn{Submit, Pill, Legend, Draggable, Ghost}, div{FileColumn, CategoryWrapper, Category}

  */
  // Declare the necessary css here.
  var css = {
    fullscreenContainer: "\n\tposition: fixed;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\tbackground: rgba(90, 90, 90, 0.5);\n  ",
    cardTitle: "\n\twidth: 80%;\n\tmargin-left: auto;\n\tmargin-right: auto;\n\tmargin-top: 40px;\n  ",
    card: "\n\t  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);\n\t  transition: 0.3s;\n\t  border-radius: 5px;\n\t  background-color: gainsboro;\n\t  width: 80%;\n\t  max-height: 90%;\n\t  margin-left: auto;\n\t  margin-right: auto;\n\t  padding: 4px;\n  ",
    btn: "\n\t  border: none;\n\t  border-radius: 12px;\n\t  text-align: center;\n\t  text-decoration: none;\n\t  display: inline-block;\n\t  font-size: 20px;\n\t  margin: 4px 2px;\n\t  cursor: pointer;\n  ",
    btnPill: "\n      border: none;\n\t  border-radius: 12px;\n\t  text-align: center;\n\t  text-decoration: none;\n  ",
    btnSubmit: "\n\tbackground-color: mediumSeaGreen; \n\tcolor: white;\n  ",
    btnLegend: "\n\t  display: inline-block;\n\t  cursor: default;\n  ",
    btnDraggable: "\n\t  display: block;\n\t  cursor: pointer;\n\t  position: relative;\n\t  white-space: nowrap;\n  ",
    btnGhost: "\n\t  display: block;\n\t  color: gainsboro;\n\t  background-color: gainsboro;\n\t  pointer: default;\n  ",
    divFileColumn: "\n\t  display: table-cell;\n\t  vertical-align: top;\n  ",
    divCategoryWrapper: "\n\t  display: table-row; \n\t  vertical-align: top;\n  ",
    divCategory: "\n\t  display: table-cell; \n\t  vertical-align: top; \n\t  border-style: solid; \n\t  border-radius: 15px;\n\t  border-width: 0px;\n\t  padding: 3px;\n  "
  }; // css

  var template$2 = /*#__PURE__*/function () {
    function template(files, categories) {
      _classCallCheck(this, template);

      var obj = this; // The files themselves need not be saved, but the variables they hold need to be. Furthermore, the file names need to be preserved. Maybe just leave it as is.

      obj.files = files; // Categories should include `unused';

      obj.categories = unique$1(categories.concat("unused"));
      obj.node = template.html2element(obj.backbone());
      obj.update();
    } // constructor


    _createClass$1(template, [{
      key: "update",
      value: function update() {
        // The node should stay the same, but the interactive content should be redone.
        var obj = this; // Update the legend on top.

        var legend = obj.node.querySelector("div.legend");
        legend.lastChild.remove();
        legend.appendChild(template.html2element(obj.legend())); // Update the interactive body

        var body = obj.node.querySelector("div.body");
        body.lastChild.remove();
        body.appendChild(template.html2element(obj.interactivecontent())); // Control the heights.

        template.coordinateFileDivs(obj.node);
      } // update
      // The color scheme.

    }, {
      key: "color",
      get: function get() {
        var obj = this;
        var scheme = d3.scaleOrdinal(d3.schemePastel2).domain(obj.categories);
        return function (category) {
          return category == "unused" ? "gainsboro" : scheme(category);
        };
      } // color

    }, {
      key: "backbone",
      value: function backbone() {
        return "\n\t\t  <div class=\"menu-card\" style=\"".concat(css.card, "\">\n\t\t\n\t\t\t<h2 style=\"display: inline;\">Metadata merging:</h2>\n\t\t\t\n\t\t\t<div class=\"legend\">\n\t\t\t  <div>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t\t \n\t\t\t<div class=\"body\" style=\"overflow-y: scroll; overflow-x: scroll; height: 400px;\">\n\t\t\t  <div>\n\t\t\t  </div>\n\t\t\t</div>\n\t\t\t\n\t\t\t\n\t\t\t\n\t\t\t<div>\n\t\t\t  <button class=\"submit\" style=\"").concat(css.btn + css.btnSubmit, "\">Submit</button>\n\t\t    </div>\n\t\t\t\n\n\t\t  </div>\t\t\n\t\t");
      } // app

    }, {
      key: "legend",
      value: function legend() {
        // Still add a ghost button if the re is no categories to maintain hte look.
        var obj = this;
        return "\n\t\t  <div>\n\t\t\t".concat(obj.categories.length > 0 ? obj.categories.map(function (d) {
          return obj.legendbutton(d);
        }).join("") : template.ghostbutton(), "\n\t\t  </div>\n\t\t");
      } // legend

    }, {
      key: "interactivecontent",
      value: function interactivecontent() {
        var obj = this;
        return "\n\t\t  <div>\n\t\t\t".concat(obj.files.map(function (fileobj) {
          return obj.filecolumn(fileobj);
        }).join(""), "\n\t\t  </div>");
      } // interactivecontent

    }, {
      key: "filecolumn",
      value: function filecolumn(fileobj) {
        var obj = this;
        return "\n\t\t  <div class=\"file\" style=\"".concat(css.divFileColumn, "\">\n\t\t\t<p style=\"text-align: center;\">\n\t\t\t  <strong>").concat(fileobj.filename, "</strong>\n\t\t\t</p>\n\t\t  \n\t\t\t").concat(obj.categories.map(function (category) {
          return obj.category(fileobj, category);
        }).join(""), "\n\t\t  \n\t\t  </div>\n\t\t");
      } // filecolumn

    }, {
      key: "category",
      value: function category(fileobj, _category) {
        var obj = this;
        var variables = fileobj.content.variables.filter(function (varobj) {
          return varobj.category == _category;
        });
        return "\n\t\t  <div style=\"".concat(css.divCategoryWrapper, "\">\n\t\t\t<div class=\"category ").concat(_category, "\" \n\t\t\t     style=\"").concat(css.divCategory, "\"\n\t\t\t\t ownerfile=\"").concat(fileobj.filename, "\"\n\t\t\t>\n\t\t\t  ").concat(variables.map(function (variableobj) {
          return obj.draggablebutton(variableobj);
        }).join(""), "\n\t\t\t  \n\t\t\t  ").concat(template.ghostbutton(["ghost-endstop"]), "\n\t\t\t</div>\n\t\t  </div>\n\t\t");
      } // category

    }, {
      key: "draggablebutton",
      value: // button
      function draggablebutton(variableobj) {
        var obj = this;
        var fractionunique = variableobj.nunique == variableobj.n ? "" : ",  ".concat(variableobj.nunique, " / ").concat(variableobj.n);
        var label = "".concat(variableobj.name, " (").concat(variableobj.type + fractionunique, ")");
        var cssstyle = css.btnPill + css.btnDraggable + "background-color: ".concat(obj.color(variableobj.category), ";");
        var cssclasses = variableobj.supportedCategories.concat("draggable").join(" ");
        return template.button(label, cssstyle, cssclasses, variableobj.name);
      } // draggableButton

    }, {
      key: "legendbutton",
      value: function legendbutton(category) {
        var obj = this;
        var cssstyle = css.btnPill + css.btnLegend + "background-color: ".concat(obj.color(category), ";");
        return template.button(category, cssstyle, "draggable");
      } // draggableButton

    }], [{
      key: "button",
      value: function button(label, cssstyle, cssclassname, variablename) {
        return "\n\t\t  <button class=\"".concat(cssclassname, "\" style=\"").concat(cssstyle, "\" variable=\"").concat(variablename, "\">\n\t\t\t<strong>").concat(label, "</strong>\n\t\t  </button>\n\t\t");
      }
    }, {
      key: "ghostbutton",
      value: function ghostbutton(classnames) {
        var cssstyle = css.btnPill + css.btnGhost;
        var cssclass = classnames ? "ghost ".concat(classnames.join(" ")) : "ghost";
        return template.button("ghost", cssstyle, cssclass);
      } // ghostButton

    }, {
      key: "html2element",
      value: function html2element(html) {
        var _template = document.createElement('template');

        _template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

        return _template.content.firstChild;
      } // html2element
      // Coordinate category container heights.

    }, {
      key: "trimcontainers",
      value: function trimcontainers(containers) {
        // If the last element of any container is a ghost element remove it.
        containers.forEach(function (container) {
          // Loop over the children backwards.
          var keep = false;

          for (var i = container.children.length - 1; i > -1; i--) {
            // The first button that is not a ghost triggers all the others to be kept.
            var testelement = container.children[i];
            var testclass = testelement.classList; // Don't test if it's the stopend.

            if (!testclass.contains("ghost-endstop")) {
              keep = testclass.contains("ghost") ? keep : true;

              if (!keep) {
                container.removeChild(testelement);
              } // if

            } // if

          } // for

        }); // forEach
      } // trimcontainers

    }, {
      key: "coordinateFileDivs",
      value: function coordinateFileDivs(parent) {
        // All filedivs will have the same number of categories. Just make sure that all comparable categories have the same number of elements within them.
        var containers = parent.querySelectorAll("div.category"); // Get all the categories.

        var categorynames = [];
        containers.forEach(function (category) {
          categorynames = categorynames.concat(category.classList.value.split(" "));
        });
        categorynames = unique$1(categorynames);
        categorynames.forEach(function (categoryname) {
          // Find all the categories among all the files that need to be coordinated.
          var categoriesToCoordinate = parent.querySelectorAll("div.".concat(categoryname)); // First trim out all trailing blank spots.

          template.trimcontainers(categoriesToCoordinate); // Find the maximum length

          var n = 0;
          categoriesToCoordinate.forEach(function (category) {
            n = category.children.length > n ? category.children.length : n;
          }); // forEach
          // Now force them all to the same length by adding ghost elements in front of the ghost-endstop element.

          categoriesToCoordinate.forEach(function (category) {
            var k = n - category.children.length;
            var endstop = category.querySelector("button.ghost-endstop");

            for (var i = 0; i < k; i++) {
              category.insertBefore(template.html2element(template.ghostbutton()), endstop);
            } // for

          }); // forEach
        }); // forEach
      } // coordinateFileDivs

    }]);

    return template;
  }(); // template
  // The functionality.
  // This is the dragging.


  var variabledrag = /*#__PURE__*/function (_dragnode) {
    _inherits(variabledrag, _dragnode);

    var _super = _createSuper(variabledrag);

    function variabledrag(node, containers, parent, color) {
      var _this;

      _classCallCheck(this, variabledrag);

      _this = _super.call(this, node);

      var obj = _assertThisInitialized$1(_this); // Containers are specified to limit the number of divs the button can be moved to.


      obj.containers = containers; // The parent is required as the height of categories depends on other corresponding categories.

      obj.parent = parent; // The color cheme is needed to allow the button to change color when it is assigned to a new category.

      obj.color = color;
      obj.apply();
      return _this;
    } // constructor
    // Supercede the drag events.


    _createClass$1(variabledrag, [{
      key: "onstart",
      value: function onstart() {
        // obj.d3node.raise();
      } // onstart

    }, {
      key: "ondrag",
      value: function ondrag() {
        var obj = this; // Find which container the button is over, and if it's allowed to be there.
        // Make a preview. To highlight the position into which the variable can be dropped we reposition the target ghost.

        var current = obj.currentcontainer();
        obj.stylecontainers(current);
      } // ondrag

    }, {
      key: "onend",
      value: function onend() {
        var obj = this;
        var current = obj.currentcontainer();
        obj.reposition(current);
        obj.stylecontainers(); // Make sure the categories of all files maintain consistent heights, and are as short as possible.

        template$2.coordinateFileDivs(obj.parent); // Change the color of the variable to match its new category.

        obj.stylebutton();
      } // onend
      // Movement

    }, {
      key: "currentcontainer",
      value: function currentcontainer() {
        var obj = this;
        var current;
        obj.containers.forEach(function (container) {
          var overlap = obj.calculateoverlap(obj.node, container);

          if (overlap > 0) {
            // Have to check compatibility also. How to encode this information to the variables already? That's where the categories come from. Should come from the file then, since the categories are hardcoded within it no? 
            if (obj.isContainerCompatible(container)) {
              current = container;
            } // if

          } // if


          return current;
        }); // forEach

        if (!current) {
          current = obj.node.parentElement;
        } // if


        return current;
      } // currentcontainer

    }, {
      key: "isContainerCompatible",
      value: function isContainerCompatible(container) {
        var obj = this;
        return obj.node.classList.contains(container.classList[1]);
      } // isContainerCompatible

    }, {
      key: "calculateoverlap",
      value: function calculateoverlap(a, b) {
        // Calculate hte overlap between nodes `a' and `b'.
        var arect = a.getBoundingClientRect();
        var brect = b.getBoundingClientRect(); // Note that top is top on screen, but bottom in coordinates.

        var upper = Math.min(arect.bottom, brect.bottom);
        var lower = Math.max(arect.top, brect.top);
        var overlap = upper - lower < 0 ? 0 : upper - lower;
        return overlap;
      } // calculateoverlap

    }, {
      key: "reposition",
      value: function reposition(container) {
        // I don't actually want the element to be moved between two elements. I only want to allow the user to put a variable into an empty spot. If the variable isn't dropped over an empty spot it should be added to the end.
        var obj = this; // Only find if the variable we're over is a ghost variable.

        var targetghost = null;
        container.querySelectorAll("button.ghost").forEach(function (node) {
          // Check if the dragged node is over this one.
          var current = targetghost ? obj.calculateoverlap(obj.node, targetghost) : 0;
          var candidate = obj.calculateoverlap(obj.node, node);

          if (candidate > current) {
            targetghost = node;
          } // if

        }); // forEach
        // In case no ghost is found:
        //  same container - keep position.
        // new container - append to the end.

        if (targetghost) {
          // Append to ghost position.
          move(obj.node, container, targetghost);
        } else {
          // No ghost was found. If the container is the same, then don't move.
          if (obj.node.parentElement == container) ; else {
            move(obj.node, container, targetghost);
          } // if

        } // if


        function move(a, container, b) {
          // Append a ghost node to the origin.
          var originghost = template$2.html2element(template$2.ghostbutton());
          a.parentElement.insertBefore(originghost, a); // Append to ghost position.

          a.parentElement.removeChild(a);
          container.insertBefore(a, b); // If the ghost isnt a ghost-endstop then remove it.

          var endstop = container.querySelector("button.ghost-endstop");

          if (b) {
            if (!b.classList.contains("ghost-endstop")) {
              b.parentElement.removeChild(b);
            } // if

          } else {
            // b was null, and was appended after the ghost-endstop. Detach and attach it so it's the last one.
            container.removeChild(endstop);
            container.appendChild(endstop);
          } // if

        } // move


        obj.node.style.left = 0;
        obj.node.style.top = 0;
      } // reposition
      // Coordinating the containers.

    }, {
      key: "stylebutton",
      value: function stylebutton() {
        // Make sure that the button has the color it is supposed to have.
        var obj = this; // Where to get the color from?

        var currentcategoryname = obj.node.parentElement.classList[1];
        obj.node.style.backgroundColor = obj.color(currentcategoryname);
      } // stylebutton

    }, {
      key: "stylecontainers",
      value: function stylecontainers(current) {
        // The current container should have its border highlighted, while all the others should have no border.
        var obj = this;
        obj.containers.forEach(function (container) {
          container.style.borderWidth = "0px";
        });

        if (current) {
          current.style.borderWidth = "2px";
        } // if

      } // stylecontainers

    }]);

    return variabledrag;
  }(dragnode); // variabledrag
  // The coordination of merging.


  var metadatamergingui = /*#__PURE__*/function () {
    function metadatamergingui(files) {
      _classCallCheck(this, metadatamergingui);

      var obj = this; // It will need to keep track of the files. These will already be metadata files.

      obj.files = files;
      obj.merginginfo = []; // Maje the html builder and get a node to attach to the html app.

      obj.builder = new template$2(obj.files, obj.categories);
      obj.node = obj.builder.node; // Apply the submit functionality.

      obj.node.querySelector("button.submit").addEventListener("click", function () {
        return obj.submit();
      });
      makeObservable(obj, {
        files: observable,
        categories: computed,
        updatefiles: action,
        submit: action
      });
      autorun(function () {
        obj.update();
      });
    } // constructor


    _createClass$1(metadatamergingui, [{
      key: "categories",
      get: function get() {
        var obj = this;
        return unique$1(obj.files.reduce(function (acc, fileobj) {
          acc = acc.concat(fileobj.content.variables.map(function (v) {
            return v.category;
          }));
          return acc;
        }, []));
      } // categories

    }, {
      key: "update",
      value: function update() {
        var obj = this; // Somehow uncouple the template more. All hte interactive content needs to be updated - including the legend.
        // Make the builder observe these itself??

        obj.builder.files = obj.files;
        obj.builder.categories = obj.categories; // If htere is merging info available, then apply it.

        /*
        if(obj.merginginfo){
        	obj.sortByLoadedMergingInfo(obj.merginginfo)
        } // if
        */

        obj.builder.update(); // Apply the draggable functionality. This should really be applied on a file by file basis.

        var body = obj.builder.node.querySelector("div.body");
        var filedivs = obj.builder.node.querySelectorAll("div.file");
        filedivs.forEach(function (filediv) {
          var categories = filediv.querySelectorAll("div.category");
          var draggables = filediv.querySelectorAll("button.draggable");
          draggables.forEach(function (draggable) {
            new variabledrag(draggable, categories, body, obj.builder.color);
          });
        }); // forEach
      } // update	
      // Outside actions

    }, {
      key: "updatefiles",
      value: function updatefiles(files) {
        var obj = this;
        obj.files = files;
      } // updatefiles

    }, {
      key: "submit",
      value: function submit() {
        var obj = this;
        obj.merginginfo = obj.collectmerginginfo();
      } // submit

    }, {
      key: "collectmerginginfo",
      value: function collectmerginginfo() {
        // Collect the merging info by looping over the identified categories and comparing the elements in the same position.
        var obj = this; // MAYBE IT SHOULDNT BE A MAP

        var info = obj.categories.reduce(function (acc, category) {
          // Collect the DOM containers.
          var categorydivs = obj.node.querySelectorAll("div.".concat(category)); // Compare the children. They should all have the same number of them. Calculate the minimum just in case.

          var n = Number.POSITIVE_INFINITY;
          categorydivs.forEach(function (node) {
            n = node.children.length < n ? node.children.length : n;
          }); // forEach
          // Loop over children.

          var categoryInfo = [];

          for (var i = 0; i < n; i++) {
            var comparableVariables = obj.collectComparableVariableRow(categorydivs, i); // If the merging was valid, then attach it to the info object.

            if (comparableVariables) {
              (function () {
                // This now needs to store the file name, variable name, and the variable merged alias.
                var variableAlias = comparableVariables[0].name;
                comparableVariables.forEach(function (variableobj) {
                  variableobj.category = category;
                  variableobj.alias = variableAlias;
                }); // forEach
                // Filenames can have `.` or `\` in the filename. How to store the merged information in that case? Special objects like: {filename: ``, variable}

                categoryInfo = categoryInfo.concat(comparableVariables);
              })();
            } // if

          } // for
          // Only do this if categoryInfo has some information.


          if (categoryInfo.length > 0) {
            acc = acc.concat(categoryInfo);
          } // if


          return acc;
        }, []); // reduce

        return info;
      } // collectmerginginfo

    }, {
      key: "collectComparableVariableRow",
      value: function collectComparableVariableRow(categorydivs, i) {
        // Collect children in comparable positions.
        var comparablevariables = []; // forEach does not allow a `break`.

        var _iterator = _createForOfIteratorHelper(categorydivs),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var categorynode = _step.value;
            var variablenode = categorynode.children[i];

            if (variablenode.classList.contains("ghost")) {
              comparablevariables = undefined;
              break;
            } else {
              comparablevariables.push({
                filename: categorynode.attributes.ownerfile.value,
                name: variablenode.attributes.variable.value
              });
            } // if

          } // for

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return comparablevariables;
      } // collectComparableVariableRow
      // How to sort the variables given some merging data? They will have to be ordered in the data itself.

    }, {
      key: "sortByLoadedMergingInfo",
      value: function sortByLoadedMergingInfo(mergingInfo) {
        // Establish the order by sorting the variables within their fileobjects. Mismatched variables should just be put at the end? But what if several files have mismatching variables? Move them into unused?
        // Ok, but then first loop through all the keys of the merging info, find those that aren't decalred, change their category to unused, and then continue.
        // Loop over the files and check what has been declared. Anything undeclared is moved to unused.
        var obj = this; // Create an alias order object that can be used for ordering.

        var declaredAliases = unique$1(mergingInfo.map(function (mergeentry) {
          return mergeentry.alias;
        })); // Variable name to alias ->
        // How to make sure that only items that are fully declared are being used?? Filter out the things that are not needed??
        // Reorder the variables in the categories.

        obj.files.forEach(function (fileobj) {
          var declaredVariables = mergingInfo.filter(function (mergeentry) {
            return mergeentry.filename == fileobj.filename;
          }); // filter
          // Create a variable2alias array.

          var variablename2alias = declaredVariables.reduce(function (a, variable) {
            a[variable.name] = variable.alias;
            return a;
          }, {}); // reduce
          // Loop over the variables and have those that are not declared moved to unused.

          fileobj.content.variables.forEach(function (variableobj) {
            var declared = declaredVariables.filter(function (declaredobj) {
              return declaredobj.name == variableobj.name;
            });

            if (declared.length != 1) {
              // Undeclared variables are considered unused.
              variableobj.category = "unused";
            } else {
              // Declared variables may have to be moved to a different category.
              variableobj.category = declared[0].category;
            } // if

          }); // forEach
          // Now sort by category name. How to find position within category?
          // Just

          fileobj.content.variables.sort(function (x, y) {
            // Just sort them in here. First sort by category, and then sort by the prescribed order value.
            // The variables in content don't have aliases, because they don't need them. Aliases are just secondary names that allow connection of primary variable names.
            var categorysort = ("" + x.category).localeCompare(y.category);
            var variablesort = declaredAliases.indexOf(variablename2alias[x.name]) - declaredAliases.indexOf(variablename2alias[y.name]);
            return categorysort || variablesort;
          });
        }); // forEach
      } // sortByLoadedMergingInfo

    }]);

    return metadatamergingui;
  }(); // metadatamerger

  function html2element$1(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element


  var template$1 = {
    body: "\n\t\t<div style=\"".concat(css.card, "\">\n\t\t  <div>\n\t\t\t<div>\n\t\t\t  \n\t\t\t  <div>\n\t\t\t\t<h2 style=\"display: inline;\">Loading errors:</h2>\n\t\t\t  </div>\n\t\t\t  \n\t\t\t</div>\n\t\t  </div>\n\t\t  \n\t\t  \n\t\t  <div class=\"body\" style=\"overflow-y: scroll; overflow-x: auto; height: 400px;\">\n\t\t\t<div></div>\n\t\t  </div>\n\t\t  \n\t\t  \n\t\t  \n\t\t  <div>\n\t\t\t<button class=\"submit\" style=\"").concat(css.btn + css.btnSubmit, "\">Understood</button>\n\t\t  </div>\n\t\t  \n\t\t</div>\n\t"),
    content: function content(errors) {
      return "<div style=\"padding-left: 20px;\">\n\t\t\t".concat(errors.map(template$1.erroritem).join(" "), "\n\t\t</div>");
    },
    // content
    erroritem: function erroritem(item) {
      return "\n\t\t  <p><b>".concat(item.filename, "</b> loaded by <b>").concat(item.requester, "</b>: LoaderError: Unsupported Extension</p>\n\t\t");
    }
  }; // template
  // The coordination of merging.

  var errorreport = /*#__PURE__*/function () {
    function errorreport(errors) {
      _classCallCheck(this, errorreport);

      var obj = this; // It will need to keep track of the files. These will already be metadata files.

      obj.errors = errors; // Apply the submit functionality.

      obj.node = html2element$1(template$1.body);
      obj.node.querySelector("button.submit").addEventListener("click", function () {
        return obj.hide();
      });
      obj.update();
      /*
      // Erros should be observable, and the menu should update itself automatically.
      makeObservable({
      	errors: observable
      })
      
      autorun(()=>{
      	obj.update();
      })
      */
    } // constructor


    _createClass$1(errorreport, [{
      key: "update",
      value: function update() {
        var obj = this; // Remove the current content, and add in the new content.

        var body = obj.node.querySelector("div.body");
        body.lastChild.remove();
        var content = html2element$1(template$1.content(obj.errors));
        body.appendChild(content);
      } // update

    }, {
      key: "hide",
      value: function hide() {
        var obj = this;
        obj.node.style.display = "none";
      } // hide

    }]);

    return errorreport;
  }(); // metadatamerger

  var template = "\n<div style=\"".concat(css.fullscreenContainer, "\">\n  \n  <div style=\"").concat(css.cardTitle, "\">\n\t<button class=\"showerrorreport\" style=\"").concat(css.btn + "float: right;", "\">\n\t  <i class=\"fa fa-exclamation-triangle\"></i>\n\t</button>\n  </div>\n  \n  <div class=\"menu-body\">\n  </div>\n  \n</div>\n");

  function html2element(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element
  // Make the datastore observe the metadata files loaded by the loader? And when it updates it should prompt the user. How do I introduce the user in here? With a button based action!
  // The metadata can be introduced as a reference bject, and then an autorun can be implemented inside. Ok, so then implement the file loader first.


  var metadatamenu = /*#__PURE__*/function () {
    function metadatamenu(files) {
      _classCallCheck(this, metadatamenu); // The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.


      var obj = this;
      obj.files = files; // make the node that can be appended to the DOM.

      obj.node = html2element(template);
      obj.container = obj.node.querySelector("div.menu-body"); // Make the modules that need access to the DOM.

      obj.merger = new metadatamergingui([]); // But control hte button functionality from outside? Otherwise it's tricky to control the menu behavior.

      obj.merger.node.querySelector("button.submit").addEventListener("click", function () {
        obj.submit();
      });
      obj.errorreport = new errorreport([]); // Add functionality to show/hide the error report.

      obj.node.querySelector("button.showerrorreport").addEventListener("click", function () {
        obj.showerrorreport();
      });
      obj.errorreport.node.querySelector("button.submit").addEventListener("click", function () {
        obj.hideerrorreport();
      }); // Should it be controlled here??
      // Make the class observable.

      makeObservable(obj, {
        metadatafiles: computed,
        submit: action
      });
      autorun(function () {
        obj.showmerging();
      });
    } // constructor
    // Well, the metadata manager shouldn't update everytime the files update. But I guess this will update it every time. Will the observable down the line change if this computes the same state? I think so no?


    _createClass$1(metadatamenu, [{
      key: "metadatafiles",
      get: function get() {
        var obj = this; // Find all correctly loaded metadata files.

        var valid = obj.files.filter(function (fileobj) {
          return fileobj instanceof metadataFile$1;
        });
        return valid;
      } // metadatafiles

    }, {
      key: "errors",
      get: function get() {
        return [];
      } // errors

    }, {
      key: "submit",
      value: function submit() {
        // The user has confirmed the metadata merging. Now collect the merging info, create teh metadata, and update the crossfilter. Hide the merging UI.
        var obj = this;
        var merginginfo = obj.merger.collectmerginginfo();
        console.log("Merge and update metadata", merginginfo);
        obj.hide();
      } // submit
      // Show hide the entire menu.

    }, {
      key: "show",
      value: function show() {
        // Show when the metadata files change - new data was loaded. This should work on autorun too no? Most importantly, it should work on a button press.
        var obj = this;
        obj.node.style.display = "";
      } // show

    }, {
      key: "hide",
      value: function hide() {
        var obj = this;
        obj.node.style.display = "none";
      } // 
      // Show individual menu modules.

    }, {
      key: "showerrorreport",
      value: function showerrorreport() {
        // Toggle from the metadata merging to the error report.
        var obj = this;

        if (obj.container.firstElementChild == obj.merger.node) {
          obj.container.removeChild(obj.merger.node);
        } // if


        obj.container.appendChild(obj.errorreport.node);
      } // showerrorreport

    }, {
      key: "hideerrorreport",
      value: function hideerrorreport() {
        // Toggle from the metadata merging to the error report.
        var obj = this;

        if (obj.container.firstElementChild == obj.errorreport.node) {
          obj.container.removeChild(obj.errorreport.node);
        } // if


        obj.container.appendChild(obj.merger.node);
      } // hideerrorreport
      // It does go into showmerging. Why does that one not update itself accordingly?? Maybe it can be untangled a bit?

    }, {
      key: "showmerging",
      value: function showmerging() {
        var obj = this;
        obj.merger.updatefiles(obj.metadatafiles);
        obj.hideerrorreport();
        obj.show();
      } // showmergingui

    }]);

    return metadatamenu;
  }(); // metadatamanager

  // Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.

  var fullscreenMenusContainer = document.getElementById("fullscreen-menu-container"); // For the file library now set some required extent, and then ask for some of the files.

  var library = new dbslicefilelibrary();
  console.log(library); // Dragging and dropping - there is a background element in index.html that is intended to allow files to be dropped anywhere.

  var target = document.getElementById("dragAndDrop");

  target.ondrop = function (ev) {
    library.ondrop(ev);
  };

  target.ondragover = function (ev) {
    library.ondragover(ev);
  }; // Make the metadata menu. Make the menu support drag and drop. Add an event to a button in index.html to open the menu.


  var mergerer = new metadatamenu(library.files);
  fullscreenMenusContainer.appendChild(mergerer.node);

  mergerer.node.ondrop = function (ev) {
    library.ondrop(ev);
  };

  mergerer.node.ondragover = function (ev) {
    library.ondragover(ev);
  };

  document.getElementById("merging-show").addEventListener("click", function () {
    mergerer.showmerging();
  }); // Make a fi

}());
//# sourceMappingURL=dbslice.js.map
