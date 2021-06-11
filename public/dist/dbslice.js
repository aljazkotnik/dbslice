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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$1(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray$1(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
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

  function setDifference(A, B) {
    var a = new Set(A);
    var b = new Set(B);
    return {
      aMinusB: new Set(_toConsumableArray(a).filter(function (x) {
        return !b.has(x);
      })),
      bMinusA: new Set(_toConsumableArray(b).filter(function (x) {
        return !a.has(x);
      }))
    };
  } // setDifference
   // createFileInputElement

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  var crossfilter$1 = createCommonjsModule(function (module, exports) {
  (function(exports){
  crossfilter.version = "1.3.12";
  function crossfilter_identity(d) {
    return d;
  }
  crossfilter.permute = permute;

  function permute(array, index) {
    for (var i = 0, n = index.length, copy = new Array(n); i < n; ++i) {
      copy[i] = array[index[i]];
    }
    return copy;
  }
  var bisect = crossfilter.bisect = bisect_by(crossfilter_identity);

  bisect.by = bisect_by;

  function bisect_by(f) {

    // Locate the insertion point for x in a to maintain sorted order. The
    // arguments lo and hi may be used to specify a subset of the array which
    // should be considered; by default the entire array is used. If x is already
    // present in a, the insertion point will be before (to the left of) any
    // existing entries. The return value is suitable for use as the first
    // argument to `array.splice` assuming that a is already sorted.
    //
    // The returned insertion point i partitions the array a into two halves so
    // that all v < x for v in a[lo:i] for the left side and all v >= x for v in
    // a[i:hi] for the right side.
    function bisectLeft(a, x, lo, hi) {
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (f(a[mid]) < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    }

    // Similar to bisectLeft, but returns an insertion point which comes after (to
    // the right of) any existing entries of x in a.
    //
    // The returned insertion point i partitions the array into two halves so that
    // all v <= x for v in a[lo:i] for the left side and all v > x for v in
    // a[i:hi] for the right side.
    function bisectRight(a, x, lo, hi) {
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (x < f(a[mid])) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }

    bisectRight.right = bisectRight;
    bisectRight.left = bisectLeft;
    return bisectRight;
  }
  var heap = crossfilter.heap = heap_by(crossfilter_identity);

  heap.by = heap_by;

  function heap_by(f) {

    // Builds a binary heap within the specified array a[lo:hi]. The heap has the
    // property such that the parent a[lo+i] is always less than or equal to its
    // two children: a[lo+2*i+1] and a[lo+2*i+2].
    function heap(a, lo, hi) {
      var n = hi - lo,
          i = (n >>> 1) + 1;
      while (--i > 0) sift(a, i, n, lo);
      return a;
    }

    // Sorts the specified array a[lo:hi] in descending order, assuming it is
    // already a heap.
    function sort(a, lo, hi) {
      var n = hi - lo,
          t;
      while (--n > 0) t = a[lo], a[lo] = a[lo + n], a[lo + n] = t, sift(a, 1, n, lo);
      return a;
    }

    // Sifts the element a[lo+i-1] down the heap, where the heap is the contiguous
    // slice of array a[lo:lo+n]. This method can also be used to update the heap
    // incrementally, without incurring the full cost of reconstructing the heap.
    function sift(a, i, n, lo) {
      var d = a[--lo + i],
          x = f(d),
          child;
      while ((child = i << 1) <= n) {
        if (child < n && f(a[lo + child]) > f(a[lo + child + 1])) child++;
        if (x <= f(a[lo + child])) break;
        a[lo + i] = a[lo + child];
        i = child;
      }
      a[lo + i] = d;
    }

    heap.sort = sort;
    return heap;
  }
  var heapselect = crossfilter.heapselect = heapselect_by(crossfilter_identity);

  heapselect.by = heapselect_by;

  function heapselect_by(f) {
    var heap = heap_by(f);

    // Returns a new array containing the top k elements in the array a[lo:hi].
    // The returned array is not sorted, but maintains the heap property. If k is
    // greater than hi - lo, then fewer than k elements will be returned. The
    // order of elements in a is unchanged by this operation.
    function heapselect(a, lo, hi, k) {
      var queue = new Array(k = Math.min(hi - lo, k)),
          min,
          i,
          d;

      for (i = 0; i < k; ++i) queue[i] = a[lo++];
      heap(queue, 0, k);

      if (lo < hi) {
        min = f(queue[0]);
        do {
          if (f(d = a[lo]) > min) {
            queue[0] = d;
            min = f(heap(queue, 0, k)[0]);
          }
        } while (++lo < hi);
      }

      return queue;
    }

    return heapselect;
  }
  var insertionsort = crossfilter.insertionsort = insertionsort_by(crossfilter_identity);

  insertionsort.by = insertionsort_by;

  function insertionsort_by(f) {

    function insertionsort(a, lo, hi) {
      for (var i = lo + 1; i < hi; ++i) {
        for (var j = i, t = a[i], x = f(t); j > lo && f(a[j - 1]) > x; --j) {
          a[j] = a[j - 1];
        }
        a[j] = t;
      }
      return a;
    }

    return insertionsort;
  }
  // Algorithm designed by Vladimir Yaroslavskiy.
  // Implementation based on the Dart project; see lib/dart/LICENSE for details.

  var quicksort = crossfilter.quicksort = quicksort_by(crossfilter_identity);

  quicksort.by = quicksort_by;

  function quicksort_by(f) {
    var insertionsort = insertionsort_by(f);

    function sort(a, lo, hi) {
      return (hi - lo < quicksort_sizeThreshold
          ? insertionsort
          : quicksort)(a, lo, hi);
    }

    function quicksort(a, lo, hi) {
      // Compute the two pivots by looking at 5 elements.
      var sixth = (hi - lo) / 6 | 0,
          i1 = lo + sixth,
          i5 = hi - 1 - sixth,
          i3 = lo + hi - 1 >> 1,  // The midpoint.
          i2 = i3 - sixth,
          i4 = i3 + sixth;

      var e1 = a[i1], x1 = f(e1),
          e2 = a[i2], x2 = f(e2),
          e3 = a[i3], x3 = f(e3),
          e4 = a[i4], x4 = f(e4),
          e5 = a[i5], x5 = f(e5);

      var t;

      // Sort the selected 5 elements using a sorting network.
      if (x1 > x2) t = e1, e1 = e2, e2 = t, t = x1, x1 = x2, x2 = t;
      if (x4 > x5) t = e4, e4 = e5, e5 = t, t = x4, x4 = x5, x5 = t;
      if (x1 > x3) t = e1, e1 = e3, e3 = t, t = x1, x1 = x3, x3 = t;
      if (x2 > x3) t = e2, e2 = e3, e3 = t, t = x2, x2 = x3, x3 = t;
      if (x1 > x4) t = e1, e1 = e4, e4 = t, t = x1, x1 = x4, x4 = t;
      if (x3 > x4) t = e3, e3 = e4, e4 = t, t = x3, x3 = x4, x4 = t;
      if (x2 > x5) t = e2, e2 = e5, e5 = t, t = x2, x2 = x5, x5 = t;
      if (x2 > x3) t = e2, e2 = e3, e3 = t, t = x2, x2 = x3, x3 = t;
      if (x4 > x5) t = e4, e4 = e5, e5 = t, t = x4, x4 = x5, x5 = t;

      var pivot1 = e2, pivotValue1 = x2,
          pivot2 = e4, pivotValue2 = x4;

      // e2 and e4 have been saved in the pivot variables. They will be written
      // back, once the partitioning is finished.
      a[i1] = e1;
      a[i2] = a[lo];
      a[i3] = e3;
      a[i4] = a[hi - 1];
      a[i5] = e5;

      var less = lo + 1,   // First element in the middle partition.
          great = hi - 2;  // Last element in the middle partition.

      // Note that for value comparison, <, <=, >= and > coerce to a primitive via
      // Object.prototype.valueOf; == and === do not, so in order to be consistent
      // with natural order (such as for Date objects), we must do two compares.
      var pivotsEqual = pivotValue1 <= pivotValue2 && pivotValue1 >= pivotValue2;
      if (pivotsEqual) {

        // Degenerated case where the partitioning becomes a dutch national flag
        // problem.
        //
        // [ |  < pivot  | == pivot | unpartitioned | > pivot  | ]
        //  ^             ^          ^             ^            ^
        // left         less         k           great         right
        //
        // a[left] and a[right] are undefined and are filled after the
        // partitioning.
        //
        // Invariants:
        //   1) for x in ]left, less[ : x < pivot.
        //   2) for x in [less, k[ : x == pivot.
        //   3) for x in ]great, right[ : x > pivot.
        for (var k = less; k <= great; ++k) {
          var ek = a[k], xk = f(ek);
          if (xk < pivotValue1) {
            if (k !== less) {
              a[k] = a[less];
              a[less] = ek;
            }
            ++less;
          } else if (xk > pivotValue1) {

            // Find the first element <= pivot in the range [k - 1, great] and
            // put [:ek:] there. We know that such an element must exist:
            // When k == less, then el3 (which is equal to pivot) lies in the
            // interval. Otherwise a[k - 1] == pivot and the search stops at k-1.
            // Note that in the latter case invariant 2 will be violated for a
            // short amount of time. The invariant will be restored when the
            // pivots are put into their final positions.
            while (true) {
              var greatValue = f(a[great]);
              if (greatValue > pivotValue1) {
                great--;
                // This is the only location in the while-loop where a new
                // iteration is started.
                continue;
              } else if (greatValue < pivotValue1) {
                // Triple exchange.
                a[k] = a[less];
                a[less++] = a[great];
                a[great--] = ek;
                break;
              } else {
                a[k] = a[great];
                a[great--] = ek;
                // Note: if great < k then we will exit the outer loop and fix
                // invariant 2 (which we just violated).
                break;
              }
            }
          }
        }
      } else {

        // We partition the list into three parts:
        //  1. < pivot1
        //  2. >= pivot1 && <= pivot2
        //  3. > pivot2
        //
        // During the loop we have:
        // [ | < pivot1 | >= pivot1 && <= pivot2 | unpartitioned  | > pivot2  | ]
        //  ^            ^                        ^              ^             ^
        // left         less                     k              great        right
        //
        // a[left] and a[right] are undefined and are filled after the
        // partitioning.
        //
        // Invariants:
        //   1. for x in ]left, less[ : x < pivot1
        //   2. for x in [less, k[ : pivot1 <= x && x <= pivot2
        //   3. for x in ]great, right[ : x > pivot2
        for (var k = less; k <= great; k++) {
          var ek = a[k], xk = f(ek);
          if (xk < pivotValue1) {
            if (k !== less) {
              a[k] = a[less];
              a[less] = ek;
            }
            ++less;
          } else {
            if (xk > pivotValue2) {
              while (true) {
                var greatValue = f(a[great]);
                if (greatValue > pivotValue2) {
                  great--;
                  if (great < k) break;
                  // This is the only location inside the loop where a new
                  // iteration is started.
                  continue;
                } else {
                  // a[great] <= pivot2.
                  if (greatValue < pivotValue1) {
                    // Triple exchange.
                    a[k] = a[less];
                    a[less++] = a[great];
                    a[great--] = ek;
                  } else {
                    // a[great] >= pivot1.
                    a[k] = a[great];
                    a[great--] = ek;
                  }
                  break;
                }
              }
            }
          }
        }
      }

      // Move pivots into their final positions.
      // We shrunk the list from both sides (a[left] and a[right] have
      // meaningless values in them) and now we move elements from the first
      // and third partition into these locations so that we can store the
      // pivots.
      a[lo] = a[less - 1];
      a[less - 1] = pivot1;
      a[hi - 1] = a[great + 1];
      a[great + 1] = pivot2;

      // The list is now partitioned into three partitions:
      // [ < pivot1   | >= pivot1 && <= pivot2   |  > pivot2   ]
      //  ^            ^                        ^             ^
      // left         less                     great        right

      // Recursive descent. (Don't include the pivot values.)
      sort(a, lo, less - 1);
      sort(a, great + 2, hi);

      if (pivotsEqual) {
        // All elements in the second partition are equal to the pivot. No
        // need to sort them.
        return a;
      }

      // In theory it should be enough to call _doSort recursively on the second
      // partition.
      // The Android source however removes the pivot elements from the recursive
      // call if the second partition is too large (more than 2/3 of the list).
      if (less < i1 && great > i5) {
        var lessValue, greatValue;
        while ((lessValue = f(a[less])) <= pivotValue1 && lessValue >= pivotValue1) ++less;
        while ((greatValue = f(a[great])) <= pivotValue2 && greatValue >= pivotValue2) --great;

        // Copy paste of the previous 3-way partitioning with adaptions.
        //
        // We partition the list into three parts:
        //  1. == pivot1
        //  2. > pivot1 && < pivot2
        //  3. == pivot2
        //
        // During the loop we have:
        // [ == pivot1 | > pivot1 && < pivot2 | unpartitioned  | == pivot2 ]
        //              ^                      ^              ^
        //            less                     k              great
        //
        // Invariants:
        //   1. for x in [ *, less[ : x == pivot1
        //   2. for x in [less, k[ : pivot1 < x && x < pivot2
        //   3. for x in ]great, * ] : x == pivot2
        for (var k = less; k <= great; k++) {
          var ek = a[k], xk = f(ek);
          if (xk <= pivotValue1 && xk >= pivotValue1) {
            if (k !== less) {
              a[k] = a[less];
              a[less] = ek;
            }
            less++;
          } else {
            if (xk <= pivotValue2 && xk >= pivotValue2) {
              while (true) {
                var greatValue = f(a[great]);
                if (greatValue <= pivotValue2 && greatValue >= pivotValue2) {
                  great--;
                  if (great < k) break;
                  // This is the only location inside the loop where a new
                  // iteration is started.
                  continue;
                } else {
                  // a[great] < pivot2.
                  if (greatValue < pivotValue1) {
                    // Triple exchange.
                    a[k] = a[less];
                    a[less++] = a[great];
                    a[great--] = ek;
                  } else {
                    // a[great] == pivot1.
                    a[k] = a[great];
                    a[great--] = ek;
                  }
                  break;
                }
              }
            }
          }
        }
      }

      // The second partition has now been cleared of pivot elements and looks
      // as follows:
      // [  *  |  > pivot1 && < pivot2  | * ]
      //        ^                      ^
      //       less                  great
      // Sort the second partition using recursive descent.

      // The second partition looks as follows:
      // [  *  |  >= pivot1 && <= pivot2  | * ]
      //        ^                        ^
      //       less                    great
      // Simply sort it by recursive descent.

      return sort(a, less, great + 1);
    }

    return sort;
  }

  var quicksort_sizeThreshold = 32;
  var crossfilter_array8 = crossfilter_arrayUntyped,
      crossfilter_array16 = crossfilter_arrayUntyped,
      crossfilter_array32 = crossfilter_arrayUntyped,
      crossfilter_arrayLengthen = crossfilter_arrayLengthenUntyped,
      crossfilter_arrayWiden = crossfilter_arrayWidenUntyped;

  if (typeof Uint8Array !== "undefined") {
    crossfilter_array8 = function(n) { return new Uint8Array(n); };
    crossfilter_array16 = function(n) { return new Uint16Array(n); };
    crossfilter_array32 = function(n) { return new Uint32Array(n); };

    crossfilter_arrayLengthen = function(array, length) {
      if (array.length >= length) return array;
      var copy = new array.constructor(length);
      copy.set(array);
      return copy;
    };

    crossfilter_arrayWiden = function(array, width) {
      var copy;
      switch (width) {
        case 16: copy = crossfilter_array16(array.length); break;
        case 32: copy = crossfilter_array32(array.length); break;
        default: throw new Error("invalid array width!");
      }
      copy.set(array);
      return copy;
    };
  }

  function crossfilter_arrayUntyped(n) {
    var array = new Array(n), i = -1;
    while (++i < n) array[i] = 0;
    return array;
  }

  function crossfilter_arrayLengthenUntyped(array, length) {
    var n = array.length;
    while (n < length) array[n++] = 0;
    return array;
  }

  function crossfilter_arrayWidenUntyped(array, width) {
    if (width > 32) throw new Error("invalid array width!");
    return array;
  }
  function crossfilter_filterExact(bisect, value) {
    return function(values) {
      var n = values.length;
      return [bisect.left(values, value, 0, n), bisect.right(values, value, 0, n)];
    };
  }

  function crossfilter_filterRange(bisect, range) {
    var min = range[0],
        max = range[1];
    return function(values) {
      var n = values.length;
      return [bisect.left(values, min, 0, n), bisect.left(values, max, 0, n)];
    };
  }

  function crossfilter_filterAll(values) {
    return [0, values.length];
  }
  function crossfilter_null() {
    return null;
  }
  function crossfilter_zero() {
    return 0;
  }
  function crossfilter_reduceIncrement(p) {
    return p + 1;
  }

  function crossfilter_reduceDecrement(p) {
    return p - 1;
  }

  function crossfilter_reduceAdd(f) {
    return function(p, v) {
      return p + +f(v);
    };
  }

  function crossfilter_reduceSubtract(f) {
    return function(p, v) {
      return p - f(v);
    };
  }
  exports.crossfilter = crossfilter;

  function crossfilter() {
    var crossfilter = {
      add: add,
      remove: removeData,
      dimension: dimension,
      groupAll: groupAll,
      size: size
    };

    var data = [], // the records
        n = 0, // the number of records; data.length
        m = 0, // a bit mask representing which dimensions are in use
        M = 8, // number of dimensions that can fit in `filters`
        filters = crossfilter_array8(0), // M bits per record; 1 is filtered out
        filterListeners = [], // when the filters change
        dataListeners = [], // when data is added
        removeDataListeners = []; // when data is removed

    // Adds the specified new records to this crossfilter.
    function add(newData) {
      var n0 = n,
          n1 = newData.length;

      // If there's actually new data to add…
      // Merge the new data into the existing data.
      // Lengthen the filter bitset to handle the new records.
      // Notify listeners (dimensions and groups) that new data is available.
      if (n1) {
        data = data.concat(newData);
        filters = crossfilter_arrayLengthen(filters, n += n1);
        dataListeners.forEach(function(l) { l(newData, n0, n1); });
      }

      return crossfilter;
    }

    // Removes all records that match the current filters.
    function removeData() {
      var newIndex = crossfilter_index(n, n),
          removed = [];
      for (var i = 0, j = 0; i < n; ++i) {
        if (filters[i]) newIndex[i] = j++;
        else removed.push(i);
      }

      // Remove all matching records from groups.
      filterListeners.forEach(function(l) { l(0, [], removed); });

      // Update indexes.
      removeDataListeners.forEach(function(l) { l(newIndex); });

      // Remove old filters and data by overwriting.
      for (var i = 0, j = 0, k; i < n; ++i) {
        if (k = filters[i]) {
          if (i !== j) filters[j] = k, data[j] = data[i];
          ++j;
        }
      }
      data.length = j;
      while (n > j) filters[--n] = 0;
    }

    // Adds a new dimension with the specified value accessor function.
    function dimension(value) {
      var dimension = {
        filter: filter,
        filterExact: filterExact,
        filterRange: filterRange,
        filterFunction: filterFunction,
        filterAll: filterAll,
        top: top,
        bottom: bottom,
        group: group,
        groupAll: groupAll,
        dispose: dispose,
        remove: dispose // for backwards-compatibility
      };

      var one = ~m & -~m, // lowest unset bit as mask, e.g., 00001000
          zero = ~one, // inverted one, e.g., 11110111
          values, // sorted, cached array
          index, // value rank ↦ object id
          newValues, // temporary array storing newly-added values
          newIndex, // temporary array storing newly-added index
          sort = quicksort_by(function(i) { return newValues[i]; }),
          refilter = crossfilter_filterAll, // for recomputing filter
          refilterFunction, // the custom filter function in use
          indexListeners = [], // when data is added
          dimensionGroups = [],
          lo0 = 0,
          hi0 = 0;

      // Updating a dimension is a two-stage process. First, we must update the
      // associated filters for the newly-added records. Once all dimensions have
      // updated their filters, the groups are notified to update.
      dataListeners.unshift(preAdd);
      dataListeners.push(postAdd);

      removeDataListeners.push(removeData);

      // Incorporate any existing data into this dimension, and make sure that the
      // filter bitset is wide enough to handle the new dimension.
      m |= one;
      if (M >= 32 ? !one : m & -(1 << M)) {
        filters = crossfilter_arrayWiden(filters, M <<= 1);
      }
      preAdd(data, 0, n);
      postAdd(data, 0, n);

      // Incorporates the specified new records into this dimension.
      // This function is responsible for updating filters, values, and index.
      function preAdd(newData, n0, n1) {

        // Permute new values into natural order using a sorted index.
        newValues = newData.map(value);
        newIndex = sort(crossfilter_range(n1), 0, n1);
        newValues = permute(newValues, newIndex);

        // Bisect newValues to determine which new records are selected.
        var bounds = refilter(newValues), lo1 = bounds[0], hi1 = bounds[1], i;
        if (refilterFunction) {
          for (i = 0; i < n1; ++i) {
            if (!refilterFunction(newValues[i], i)) filters[newIndex[i] + n0] |= one;
          }
        } else {
          for (i = 0; i < lo1; ++i) filters[newIndex[i] + n0] |= one;
          for (i = hi1; i < n1; ++i) filters[newIndex[i] + n0] |= one;
        }

        // If this dimension previously had no data, then we don't need to do the
        // more expensive merge operation; use the new values and index as-is.
        if (!n0) {
          values = newValues;
          index = newIndex;
          lo0 = lo1;
          hi0 = hi1;
          return;
        }

        var oldValues = values,
            oldIndex = index,
            i0 = 0,
            i1 = 0;

        // Otherwise, create new arrays into which to merge new and old.
        values = new Array(n);
        index = crossfilter_index(n, n);

        // Merge the old and new sorted values, and old and new index.
        for (i = 0; i0 < n0 && i1 < n1; ++i) {
          if (oldValues[i0] < newValues[i1]) {
            values[i] = oldValues[i0];
            index[i] = oldIndex[i0++];
          } else {
            values[i] = newValues[i1];
            index[i] = newIndex[i1++] + n0;
          }
        }

        // Add any remaining old values.
        for (; i0 < n0; ++i0, ++i) {
          values[i] = oldValues[i0];
          index[i] = oldIndex[i0];
        }

        // Add any remaining new values.
        for (; i1 < n1; ++i1, ++i) {
          values[i] = newValues[i1];
          index[i] = newIndex[i1] + n0;
        }

        // Bisect again to recompute lo0 and hi0.
        bounds = refilter(values), lo0 = bounds[0], hi0 = bounds[1];
      }

      // When all filters have updated, notify index listeners of the new values.
      function postAdd(newData, n0, n1) {
        indexListeners.forEach(function(l) { l(newValues, newIndex, n0, n1); });
        newValues = newIndex = null;
      }

      function removeData(reIndex) {
        for (var i = 0, j = 0, k; i < n; ++i) {
          if (filters[k = index[i]]) {
            if (i !== j) values[j] = values[i];
            index[j] = reIndex[k];
            ++j;
          }
        }
        values.length = j;
        while (j < n) index[j++] = 0;

        // Bisect again to recompute lo0 and hi0.
        var bounds = refilter(values);
        lo0 = bounds[0], hi0 = bounds[1];
      }

      // Updates the selected values based on the specified bounds [lo, hi].
      // This implementation is used by all the public filter methods.
      function filterIndexBounds(bounds) {
        var lo1 = bounds[0],
            hi1 = bounds[1];

        if (refilterFunction) {
          refilterFunction = null;
          filterIndexFunction(function(d, i) { return lo1 <= i && i < hi1; });
          lo0 = lo1;
          hi0 = hi1;
          return dimension;
        }

        var i,
            j,
            k,
            added = [],
            removed = [];

        // Fast incremental update based on previous lo index.
        if (lo1 < lo0) {
          for (i = lo1, j = Math.min(lo0, hi1); i < j; ++i) {
            filters[k = index[i]] ^= one;
            added.push(k);
          }
        } else if (lo1 > lo0) {
          for (i = lo0, j = Math.min(lo1, hi0); i < j; ++i) {
            filters[k = index[i]] ^= one;
            removed.push(k);
          }
        }

        // Fast incremental update based on previous hi index.
        if (hi1 > hi0) {
          for (i = Math.max(lo1, hi0), j = hi1; i < j; ++i) {
            filters[k = index[i]] ^= one;
            added.push(k);
          }
        } else if (hi1 < hi0) {
          for (i = Math.max(lo0, hi1), j = hi0; i < j; ++i) {
            filters[k = index[i]] ^= one;
            removed.push(k);
          }
        }

        lo0 = lo1;
        hi0 = hi1;
        filterListeners.forEach(function(l) { l(one, added, removed); });
        return dimension;
      }

      // Filters this dimension using the specified range, value, or null.
      // If the range is null, this is equivalent to filterAll.
      // If the range is an array, this is equivalent to filterRange.
      // Otherwise, this is equivalent to filterExact.
      function filter(range) {
        return range == null
            ? filterAll() : Array.isArray(range)
            ? filterRange(range) : typeof range === "function"
            ? filterFunction(range)
            : filterExact(range);
      }

      // Filters this dimension to select the exact value.
      function filterExact(value) {
        return filterIndexBounds((refilter = crossfilter_filterExact(bisect, value))(values));
      }

      // Filters this dimension to select the specified range [lo, hi].
      // The lower bound is inclusive, and the upper bound is exclusive.
      function filterRange(range) {
        return filterIndexBounds((refilter = crossfilter_filterRange(bisect, range))(values));
      }

      // Clears any filters on this dimension.
      function filterAll() {
        return filterIndexBounds((refilter = crossfilter_filterAll)(values));
      }

      // Filters this dimension using an arbitrary function.
      function filterFunction(f) {
        refilter = crossfilter_filterAll;

        filterIndexFunction(refilterFunction = f);

        lo0 = 0;
        hi0 = n;

        return dimension;
      }

      function filterIndexFunction(f) {
        var i,
            k,
            x,
            added = [],
            removed = [];

        for (i = 0; i < n; ++i) {
          if (!(filters[k = index[i]] & one) ^ !!(x = f(values[i], i))) {
            if (x) filters[k] &= zero, added.push(k);
            else filters[k] |= one, removed.push(k);
          }
        }
        filterListeners.forEach(function(l) { l(one, added, removed); });
      }

      // Returns the top K selected records based on this dimension's order.
      // Note: observes this dimension's filter, unlike group and groupAll.
      function top(k) {
        var array = [],
            i = hi0,
            j;

        while (--i >= lo0 && k > 0) {
          if (!filters[j = index[i]]) {
            array.push(data[j]);
            --k;
          }
        }

        return array;
      }

      // Returns the bottom K selected records based on this dimension's order.
      // Note: observes this dimension's filter, unlike group and groupAll.
      function bottom(k) {
        var array = [],
            i = lo0,
            j;

        while (i < hi0 && k > 0) {
          if (!filters[j = index[i]]) {
            array.push(data[j]);
            --k;
          }
          i++;
        }

        return array;
      }

      // Adds a new group to this dimension, using the specified key function.
      function group(key) {
        var group = {
          top: top,
          all: all,
          reduce: reduce,
          reduceCount: reduceCount,
          reduceSum: reduceSum,
          order: order,
          orderNatural: orderNatural,
          size: size,
          dispose: dispose,
          remove: dispose // for backwards-compatibility
        };

        // Ensure that this group will be removed when the dimension is removed.
        dimensionGroups.push(group);

        var groups, // array of {key, value}
            groupIndex, // object id ↦ group id
            groupWidth = 8,
            groupCapacity = crossfilter_capacity(groupWidth),
            k = 0, // cardinality
            select,
            heap,
            reduceAdd,
            reduceRemove,
            reduceInitial,
            update = crossfilter_null,
            reset = crossfilter_null,
            resetNeeded = true,
            groupAll = key === crossfilter_null;

        if (arguments.length < 1) key = crossfilter_identity;

        // The group listens to the crossfilter for when any dimension changes, so
        // that it can update the associated reduce values. It must also listen to
        // the parent dimension for when data is added, and compute new keys.
        filterListeners.push(update);
        indexListeners.push(add);
        removeDataListeners.push(removeData);

        // Incorporate any existing data into the grouping.
        add(values, index, 0, n);

        // Incorporates the specified new values into this group.
        // This function is responsible for updating groups and groupIndex.
        function add(newValues, newIndex, n0, n1) {
          var oldGroups = groups,
              reIndex = crossfilter_index(k, groupCapacity),
              add = reduceAdd,
              initial = reduceInitial,
              k0 = k, // old cardinality
              i0 = 0, // index of old group
              i1 = 0, // index of new record
              j, // object id
              g0, // old group
              x0, // old key
              x1, // new key
              g, // group to add
              x; // key of group to add

          // If a reset is needed, we don't need to update the reduce values.
          if (resetNeeded) add = initial = crossfilter_null;

          // Reset the new groups (k is a lower bound).
          // Also, make sure that groupIndex exists and is long enough.
          groups = new Array(k), k = 0;
          groupIndex = k0 > 1 ? crossfilter_arrayLengthen(groupIndex, n) : crossfilter_index(n, groupCapacity);

          // Get the first old key (x0 of g0), if it exists.
          if (k0) x0 = (g0 = oldGroups[0]).key;

          // Find the first new key (x1), skipping NaN keys.
          while (i1 < n1 && !((x1 = key(newValues[i1])) >= x1)) ++i1;

          // While new keys remain…
          while (i1 < n1) {

            // Determine the lesser of the two current keys; new and old.
            // If there are no old keys remaining, then always add the new key.
            if (g0 && x0 <= x1) {
              g = g0, x = x0;

              // Record the new index of the old group.
              reIndex[i0] = k;

              // Retrieve the next old key.
              if (g0 = oldGroups[++i0]) x0 = g0.key;
            } else {
              g = {key: x1, value: initial()}, x = x1;
            }

            // Add the lesser group.
            groups[k] = g;

            // Add any selected records belonging to the added group, while
            // advancing the new key and populating the associated group index.
            while (!(x1 > x)) {
              groupIndex[j = newIndex[i1] + n0] = k;
              if (!(filters[j] & zero)) g.value = add(g.value, data[j]);
              if (++i1 >= n1) break;
              x1 = key(newValues[i1]);
            }

            groupIncrement();
          }

          // Add any remaining old groups that were greater than all new keys.
          // No incremental reduce is needed; these groups have no new records.
          // Also record the new index of the old group.
          while (i0 < k0) {
            groups[reIndex[i0] = k] = oldGroups[i0++];
            groupIncrement();
          }

          // If we added any new groups before any old groups,
          // update the group index of all the old records.
          if (k > i0) for (i0 = 0; i0 < n0; ++i0) {
            groupIndex[i0] = reIndex[groupIndex[i0]];
          }

          // Modify the update and reset behavior based on the cardinality.
          // If the cardinality is less than or equal to one, then the groupIndex
          // is not needed. If the cardinality is zero, then there are no records
          // and therefore no groups to update or reset. Note that we also must
          // change the registered listener to point to the new method.
          j = filterListeners.indexOf(update);
          if (k > 1) {
            update = updateMany;
            reset = resetMany;
          } else {
            if (!k && groupAll) {
              k = 1;
              groups = [{key: null, value: initial()}];
            }
            if (k === 1) {
              update = updateOne;
              reset = resetOne;
            } else {
              update = crossfilter_null;
              reset = crossfilter_null;
            }
            groupIndex = null;
          }
          filterListeners[j] = update;

          // Count the number of added groups,
          // and widen the group index as needed.
          function groupIncrement() {
            if (++k === groupCapacity) {
              reIndex = crossfilter_arrayWiden(reIndex, groupWidth <<= 1);
              groupIndex = crossfilter_arrayWiden(groupIndex, groupWidth);
              groupCapacity = crossfilter_capacity(groupWidth);
            }
          }
        }

        function removeData() {
          if (k > 1) {
            var oldK = k,
                oldGroups = groups,
                seenGroups = crossfilter_index(oldK, oldK);

            // Filter out non-matches by copying matching group index entries to
            // the beginning of the array.
            for (var i = 0, j = 0; i < n; ++i) {
              if (filters[i]) {
                seenGroups[groupIndex[j] = groupIndex[i]] = 1;
                ++j;
              }
            }

            // Reassemble groups including only those groups that were referred
            // to by matching group index entries.  Note the new group index in
            // seenGroups.
            groups = [], k = 0;
            for (i = 0; i < oldK; ++i) {
              if (seenGroups[i]) {
                seenGroups[i] = k++;
                groups.push(oldGroups[i]);
              }
            }

            if (k > 1) {
              // Reindex the group index using seenGroups to find the new index.
              for (var i = 0; i < j; ++i) groupIndex[i] = seenGroups[groupIndex[i]];
            } else {
              groupIndex = null;
            }
            filterListeners[filterListeners.indexOf(update)] = k > 1
                ? (reset = resetMany, update = updateMany)
                : k === 1 ? (reset = resetOne, update = updateOne)
                : reset = update = crossfilter_null;
          } else if (k === 1) {
            if (groupAll) return;
            for (var i = 0; i < n; ++i) if (filters[i]) return;
            groups = [], k = 0;
            filterListeners[filterListeners.indexOf(update)] =
            update = reset = crossfilter_null;
          }
        }

        // Reduces the specified selected or deselected records.
        // This function is only used when the cardinality is greater than 1.
        function updateMany(filterOne, added, removed) {
          if (filterOne === one || resetNeeded) return;

          var i,
              k,
              n,
              g;

          // Add the added values.
          for (i = 0, n = added.length; i < n; ++i) {
            if (!(filters[k = added[i]] & zero)) {
              g = groups[groupIndex[k]];
              g.value = reduceAdd(g.value, data[k]);
            }
          }

          // Remove the removed values.
          for (i = 0, n = removed.length; i < n; ++i) {
            if ((filters[k = removed[i]] & zero) === filterOne) {
              g = groups[groupIndex[k]];
              g.value = reduceRemove(g.value, data[k]);
            }
          }
        }

        // Reduces the specified selected or deselected records.
        // This function is only used when the cardinality is 1.
        function updateOne(filterOne, added, removed) {
          if (filterOne === one || resetNeeded) return;

          var i,
              k,
              n,
              g = groups[0];

          // Add the added values.
          for (i = 0, n = added.length; i < n; ++i) {
            if (!(filters[k = added[i]] & zero)) {
              g.value = reduceAdd(g.value, data[k]);
            }
          }

          // Remove the removed values.
          for (i = 0, n = removed.length; i < n; ++i) {
            if ((filters[k = removed[i]] & zero) === filterOne) {
              g.value = reduceRemove(g.value, data[k]);
            }
          }
        }

        // Recomputes the group reduce values from scratch.
        // This function is only used when the cardinality is greater than 1.
        function resetMany() {
          var i,
              g;

          // Reset all group values.
          for (i = 0; i < k; ++i) {
            groups[i].value = reduceInitial();
          }

          // Add any selected records.
          for (i = 0; i < n; ++i) {
            if (!(filters[i] & zero)) {
              g = groups[groupIndex[i]];
              g.value = reduceAdd(g.value, data[i]);
            }
          }
        }

        // Recomputes the group reduce values from scratch.
        // This function is only used when the cardinality is 1.
        function resetOne() {
          var i,
              g = groups[0];

          // Reset the singleton group values.
          g.value = reduceInitial();

          // Add any selected records.
          for (i = 0; i < n; ++i) {
            if (!(filters[i] & zero)) {
              g.value = reduceAdd(g.value, data[i]);
            }
          }
        }

        // Returns the array of group values, in the dimension's natural order.
        function all() {
          if (resetNeeded) reset(), resetNeeded = false;
          return groups;
        }

        // Returns a new array containing the top K group values, in reduce order.
        function top(k) {
          var top = select(all(), 0, groups.length, k);
          return heap.sort(top, 0, top.length);
        }

        // Sets the reduce behavior for this group to use the specified functions.
        // This method lazily recomputes the reduce values, waiting until needed.
        function reduce(add, remove, initial) {
          reduceAdd = add;
          reduceRemove = remove;
          reduceInitial = initial;
          resetNeeded = true;
          return group;
        }

        // A convenience method for reducing by count.
        function reduceCount() {
          return reduce(crossfilter_reduceIncrement, crossfilter_reduceDecrement, crossfilter_zero);
        }

        // A convenience method for reducing by sum(value).
        function reduceSum(value) {
          return reduce(crossfilter_reduceAdd(value), crossfilter_reduceSubtract(value), crossfilter_zero);
        }

        // Sets the reduce order, using the specified accessor.
        function order(value) {
          select = heapselect_by(valueOf);
          heap = heap_by(valueOf);
          function valueOf(d) { return value(d.value); }
          return group;
        }

        // A convenience method for natural ordering by reduce value.
        function orderNatural() {
          return order(crossfilter_identity);
        }

        // Returns the cardinality of this group, irrespective of any filters.
        function size() {
          return k;
        }

        // Removes this group and associated event listeners.
        function dispose() {
          var i = filterListeners.indexOf(update);
          if (i >= 0) filterListeners.splice(i, 1);
          i = indexListeners.indexOf(add);
          if (i >= 0) indexListeners.splice(i, 1);
          i = removeDataListeners.indexOf(removeData);
          if (i >= 0) removeDataListeners.splice(i, 1);
          return group;
        }

        return reduceCount().orderNatural();
      }

      // A convenience function for generating a singleton group.
      function groupAll() {
        var g = group(crossfilter_null), all = g.all;
        delete g.all;
        delete g.top;
        delete g.order;
        delete g.orderNatural;
        delete g.size;
        g.value = function() { return all()[0].value; };
        return g;
      }

      // Removes this dimension and associated groups and event listeners.
      function dispose() {
        dimensionGroups.forEach(function(group) { group.dispose(); });
        var i = dataListeners.indexOf(preAdd);
        if (i >= 0) dataListeners.splice(i, 1);
        i = dataListeners.indexOf(postAdd);
        if (i >= 0) dataListeners.splice(i, 1);
        i = removeDataListeners.indexOf(removeData);
        if (i >= 0) removeDataListeners.splice(i, 1);
        m &= zero;
        return filterAll();
      }

      return dimension;
    }

    // A convenience method for groupAll on a dummy dimension.
    // This implementation can be optimized since it always has cardinality 1.
    function groupAll() {
      var group = {
        reduce: reduce,
        reduceCount: reduceCount,
        reduceSum: reduceSum,
        value: value,
        dispose: dispose,
        remove: dispose // for backwards-compatibility
      };

      var reduceValue,
          reduceAdd,
          reduceRemove,
          reduceInitial,
          resetNeeded = true;

      // The group listens to the crossfilter for when any dimension changes, so
      // that it can update the reduce value. It must also listen to the parent
      // dimension for when data is added.
      filterListeners.push(update);
      dataListeners.push(add);

      // For consistency; actually a no-op since resetNeeded is true.
      add(data, 0);

      // Incorporates the specified new values into this group.
      function add(newData, n0) {
        var i;

        if (resetNeeded) return;

        // Add the added values.
        for (i = n0; i < n; ++i) {
          if (!filters[i]) {
            reduceValue = reduceAdd(reduceValue, data[i]);
          }
        }
      }

      // Reduces the specified selected or deselected records.
      function update(filterOne, added, removed) {
        var i,
            k,
            n;

        if (resetNeeded) return;

        // Add the added values.
        for (i = 0, n = added.length; i < n; ++i) {
          if (!filters[k = added[i]]) {
            reduceValue = reduceAdd(reduceValue, data[k]);
          }
        }

        // Remove the removed values.
        for (i = 0, n = removed.length; i < n; ++i) {
          if (filters[k = removed[i]] === filterOne) {
            reduceValue = reduceRemove(reduceValue, data[k]);
          }
        }
      }

      // Recomputes the group reduce value from scratch.
      function reset() {
        var i;

        reduceValue = reduceInitial();

        for (i = 0; i < n; ++i) {
          if (!filters[i]) {
            reduceValue = reduceAdd(reduceValue, data[i]);
          }
        }
      }

      // Sets the reduce behavior for this group to use the specified functions.
      // This method lazily recomputes the reduce value, waiting until needed.
      function reduce(add, remove, initial) {
        reduceAdd = add;
        reduceRemove = remove;
        reduceInitial = initial;
        resetNeeded = true;
        return group;
      }

      // A convenience method for reducing by count.
      function reduceCount() {
        return reduce(crossfilter_reduceIncrement, crossfilter_reduceDecrement, crossfilter_zero);
      }

      // A convenience method for reducing by sum(value).
      function reduceSum(value) {
        return reduce(crossfilter_reduceAdd(value), crossfilter_reduceSubtract(value), crossfilter_zero);
      }

      // Returns the computed reduce value.
      function value() {
        if (resetNeeded) reset(), resetNeeded = false;
        return reduceValue;
      }

      // Removes this group and associated event listeners.
      function dispose() {
        var i = filterListeners.indexOf(update);
        if (i >= 0) filterListeners.splice(i);
        i = dataListeners.indexOf(add);
        if (i >= 0) dataListeners.splice(i);
        return group;
      }

      return reduceCount();
    }

    // Returns the number of records in this crossfilter, irrespective of any filters.
    function size() {
      return n;
    }

    return arguments.length
        ? add(arguments[0])
        : crossfilter;
  }

  // Returns an array of size n, big enough to store ids up to m.
  function crossfilter_index(n, m) {
    return (m < 0x101
        ? crossfilter_array8 : m < 0x10001
        ? crossfilter_array16
        : crossfilter_array32)(n);
  }

  // Constructs a new array of size n, with sequential values from 0 to n - 1.
  function crossfilter_range(n) {
    var range = crossfilter_index(n, n);
    for (var i = -1; ++i < n;) range[i] = i;
    return range;
  }

  function crossfilter_capacity(w) {
    return w === 8
        ? 0x100 : w === 16
        ? 0x10000
        : 0x100000000;
  }
  })(exports || commonjsGlobal);
  });

  var crossfilter = crossfilter$1.crossfilter;

  var dbsliceFile = /*#__PURE__*/function () {
    function dbsliceFile(file, requester) {
      _classCallCheck(this, dbsliceFile); // How to load if file is an actual File object.


      if (file instanceof File) {
        file = {
          url: URL.createObjectURL(file),
          filename: file.name
        };
      } // if


      this.url = file.url;
      this.filename = file.filename;
      this.extension = file.filename.split(".").pop();
      this.promise = undefined; // Also log the requestor. If this was passed in then use the passed in value, otherwise the requestor is the user.

      this.requester = requester ? requester : "User"; // Only dbslicefile interacts with errors. The errors are saved attached to the files that produced them. But they are saved separately in the library to both allow them to be reloaded when needed, and to be able to generate an error report for the user.

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
                  if (text_[0].startsWith("#")) {
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

  var metadataFile = /*#__PURE__*/function (_dbsliceFile) {
    _inherits(metadataFile, _dbsliceFile);

    var _super = _createSuper(metadataFile);

    function metadataFile() {
      var _this;

      _classCallCheck(this, metadataFile);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.classify = {
        all: function all(obj) {
          // This already executes in a promise chain, therefore it's not needed to update the obj.promise. The promises created here will be resolved before the overhead promise resolves further.
          // Create all the testing promises.
          var testPromises = obj.content.variables.map(function (variable) {
            // Check this column. Variable is now an object!
            return obj.classify.variable(obj, variable);
          }); // Return the final promise.

          return Promise.all(testPromises).then(function (variableClassification) {
            // The promises update the variable classification into the file object directly.
            // obj.content.categories = variableClassification
            return obj;
          });
        },
        // all
        variable: function variable(obj, _variable) {
          // Retrieve an actual value already.
          var testrow = dbsliceFile.testrow(obj.content.data);
          var testval = testrow.row[_variable.name]; // Split the testing as per the variable type received.

          var promise;

          switch (_typeof(testval)) {
            case "string":
              // String can be a file too.
              _variable.type = "string";
              promise = obj.classify.string(obj, _variable, testval);
              break;

            case "number":
              _variable.category = "ordinal";
              _variable.type = "number";
              promise = _variable;
              break;

            default:
              _variable.category = "Unused";
              _variable.type = undefined;
              promise = _variable;
          } // switch


          return promise;
        },
        // variable
        string: function string(obj, variable, testval) {
          // If the string is a file, load it in to identify it's structure. It's not important which extension the file has, but what is it's internal structure.
          // 'obj' is needed to construct an on-load response, 'variable' and 'testval' to have the name value pair.  
          var promise; // Create a new onDemandFile to load in it's contents.

          switch (testval.split(".").pop()) {
            case "json":
            case "csv":
              // Try to classify the testval as a file. The requester is the metadata for which the variables are being classified.
              var testFile = new onDemandFile({
                url: testval,
                filename: testval
              }, obj.filename);
              promise = obj.classify.file(variable, testFile);
              break;

            default:
              // Unsupported extension.
              variable.category = "categorical";
              promise = variable;
          } // switch


          return promise;
        },
        // string
        file: function file(variable, testFile) {
          // Make a new generic on-demand file, and return a promise that will return the file type.
          testFile.load(); // What can go wrong:
          // file is not found
          // file has wrong content
          // Below 'obj' represents 'testFile'.

          return Promise.all([testFile.promise]).then(function (obj) {
            // It's possible that hte file was found and loaded correctly. In that case 'obj.content.format' will contain the name of the file type. Otherwise this field will not be accessible.
            try {
              // Category is the categorisation that will actually be used, and type cannot be changed.
              variable.category = obj[0].content.format;
              variable.type = obj[0].content.format;
              return variable;
            } catch (_unused) {
              // If the loading failed for whatever reason the variable is retained as a categorical.
              variable.category = "categorical";
              return variable;
            } // try

          });
        } // file

      };
      return _this;
    }

    _createClass$1(metadataFile, [{
      key: "onload",
      value: function onload(obj) {
        // This executes in a promise chain, therefore the overhead promise will wait until thiss is fully executed.
        // Check if suitable categories have already been declared.
        var classificationPromise;

        if (!obj.content.categories) {
          // Launch the variable classification.
          classificationPromise = obj.classify.all(obj);
        } else {
          classificationPromise = Promise.resolve().then(function (d) {
            return obj;
          });
        } // if 
        // To ensure that the classification is included into the loading promise chain a promise must be returned here. This promise MUST return obj. 'classify.all' returns a promise, which returns the object with the classified variables.


        return classificationPromise;
      } // onload

    }, {
      key: "format",
      value: function format(obj) {
        // Restructure the data into an expected format
        obj.content = dbsliceFile.test.structure(metadataFile, obj.content);
        return obj;
      } // format

    }], [{
      key: "cat2var",
      value: // classify
      // Where is this used??
      function cat2var(categories) {
        // If categories are given, just report the categorisation. But do check to make sure all of the variables are in the categories!! What to do with label and taskId??
        var variables = [];
        var declaredVariables;
        Object.getOwnPropertyNames(categories).forEach(function (category) {
          if (categoryInfo.supportedCategories.includes(category)) {
            declaredVariables = categories[category].map(function (d) {
              return {
                name: d,
                category: category,
                type: categoryInfo.cat2type[category]
              };
            });
            variables = variables.concat(declaredVariables);
          } // if

        }); // Check that all hte variables are declared!

        return variables;
      } // category2variable

    }]);

    return metadataFile;
  }(dbsliceFile); // metadataFile


  metadataFile.structure = {
    csv2metadataFile: function csv2metadataFile(content) {
      var content_; // Data values need to be converted to numbers. Convert the 'variables' into objects?

      content_ = {
        variables: content.columns.map(function (d) {
          return {
            name: d,
            category: undefined,
            type: undefined
          };
        }),
        data: dbsliceFile.convertNumbers(content)
      };
      metadataFile.test.content(content_);
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
      }; // Check if declared variables contain all variables in the data.

      var allVariablesDeclared = arrayEqual(metadataFile.cat2var(content.header).map(function (d) {
        return d.name;
      }), content_.variables.map(function (d) {
        return d.name;
      })); // All variables are declared, but have they been declared in the right categories??

      if (allVariablesDeclared) {
        // All variables have been declared. The categories can be assigned as they are.
        content_.variables = metadataFile.cat2var(content.header);
      } // if


      metadataFile.test.content(content_);
      return content_;
    } // object

  };
  metadataFile.test = {
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
  var noop = function noop() {};
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
      onBecomeObservedHandler = noop;
    }

    if (onBecomeUnobservedHandler === void 0) {
      onBecomeUnobservedHandler = noop;
    }

    var atom = new Atom(name); // default `noop` listener will not initialize the hook Set

    if (onBecomeObservedHandler !== noop) {
      onBecomeObserved(atom, onBecomeObservedHandler);
    }

    if (onBecomeUnobservedHandler !== noop) {
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
          yieldedPromise.then(noop, noop);
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

  function inherit(ctor, proto) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ctor.prototype, proto);
    } else if (ctor.prototype.__proto__ !== undefined) {
      ctor.prototype.__proto__ = proto;
    } else {
      ctor.prototype = proto;
    }
  }

  inherit(StubArray, Array.prototype); // Weex proto freeze protection was here,
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

  /* ARCHITECTURE CHANGE

  import {sessionManager} from "./sessionManager.js";
  import {color} from "./color.js";

  // On cfChange the color options and the user interface need to be changed.
  color.settings.options = dbsliceData.data.categoricalProperties
  sessionManager.resolve.ui.dataAndSessionChange()

  */
  // WORK IN PROGRESS

  /* 1.) DIMENSION MANAGEMENT

  How to handle the creation of dimensions? Maybe we should think about the pruning of values? For example: remove all variables that are the same for all of the entries?

  */

  /* 2.) DATA FLOW 

  	How should the data enter? The loading files should be taken care of by the library, the metadata combining by a combiner, and the data manipulations by the data holder.
  	
  	Metadata flow is: loader -> combiner -> datastore -> plots
  	On-demand flow is: loader -> plots
  	
  	
  	How will reactive plots access their data? How will plots in general access their data? For metadata this could be simple, the current selection could just be a computed value, and all other plots would just observe it. How do I pass in an observed value?
  	
  	How would on-demand plots get their data? Would they observe the storage to see if the loaded files match what they need? And maybe then they would draw one item at a time? Maybe experiment with this.
  	
  	
  	Throttling the loading of the on-demand data to ensure interactivity. Instead of having the button let dbslice load the on-demand data needed on the fly (the library helps here enormously!), but only if there is sufficient time to do it.

  */

  /* 3.) HANDLING DATETIME DATA */

  /* 4.) INCLUDE THE FILTERING */
  // Make the datastore observe the metadata files loaded by the loader? And when it updates it should prompt the user. How do I introduce the user in here? With a button based action!
  // The metadata can be introduced as a reference bject, and then an autorun can be implemented inside. Ok, so then implement the file loader first.

  var _resolveHeaderChange = /*#__PURE__*/_classPrivateFieldLooseKey("resolveHeaderChange");

  var _resolveDimensions = /*#__PURE__*/_classPrivateFieldLooseKey("resolveDimensions");

  var _resolveUniqueValues = /*#__PURE__*/_classPrivateFieldLooseKey("resolveUniqueValues");

  var _resolveHistogramRanges = /*#__PURE__*/_classPrivateFieldLooseKey("resolveHistogramRanges");

  var _resolveAttributes = /*#__PURE__*/_classPrivateFieldLooseKey("resolveAttributes");

  var metadatamanager = /*#__PURE__*/function () {
    function metadatamanager(files) {
      _classCallCheck(this, metadatamanager);

      Object.defineProperty(this, _resolveAttributes, {
        value: _resolveAttributes2
      });
      Object.defineProperty(this, _resolveHistogramRanges, {
        value: _resolveHistogramRanges2
      });
      Object.defineProperty(this, _resolveUniqueValues, {
        value: _resolveUniqueValues2
      });
      Object.defineProperty(this, _resolveDimensions, {
        value: _resolveDimensions2
      });
      Object.defineProperty(this, _resolveHeaderChange, {
        value: _resolveHeaderChange2
      }); // The `datastore' object is responsible for tracking all the data changes and selections. It does not hold any information regarding the session, and about any plots made with the data.

      var _obj = this;

      _obj.files = files; // This is a mix of the crossfilter, it's dimensions, and some metadata about the metadata in the crossfilter. Untangle?

      var _cf = crossfilter([]); // Maybe this should be a separate state to control itself? It could be a helper class within here? So that it controls the filtering etc, there will be another class for user interactions.


      _obj.data = {
        // Metadata about metadata.
        categoricalProperties: [],
        ordinalProperties: [],
        line2dProperties: [],
        contour2dProperties: [],
        // Crossfilter and the associated dimensions.
        cf: _cf,
        categoricalDims: {},
        ordinalDims: {},
        taskDim: _cf.dimension(function (d) {
          return d.taskId;
        }),
        fileDim: _cf.dimension(function (d) {
          return d.filenameId;
        }),
        // Filters.
        filterSelected: [],
        histogramSelectedRanges: [],
        manuallySelectedTasks: [],
        // Precomputed values.
        categoricalUniqueValues: {}
      }; // cfData
      // Merging progressively stores the users inputs on how to merge the metadata.

      _obj.merging = {}; // Make the class observable.

      makeObservable(_obj, {
        metadatafiles: computed
      });
    } // constructor
    // Well, the metadata manager shouldn't update everytime the files update. But I guess this will update it every time. Will the observable down the line change if this computes the same state? I think so no?


    _createClass$1(metadatamanager, [{
      key: "metadatafiles",
      get: function get() {
        var obj = this; // Find all correctly loaded metadata files.

        var valid = obj.files.filter(function (fileobj) {
          return fileobj instanceof metadataFile;
        }); // let valid = obj.files.filter( fileobj => true)

        return valid;
      } // metadatafiles
      // Now every time the metadata files change we should call the UI, merge the metadata, and then continue.
      // This should be an action somehow no?
      // cfChange -> swapdata

    }, {
      key: "swapdata",
      value: function swapdata(metadata) {
        // Handle the change to the metadata. Simply exchange all the internal data. But, I may need to retain the filter settings?
        var cf = this.data.cf; // Exchange the data.

        cf.remove();
        cf.add(metadata.data); // Resolve the differences between the old variables and the new variables.

        _classPrivateFieldLooseBase(this, _resolveHeaderChange)[_resolveHeaderChange](metadata.header); // cfDataManager.resolve.cfData.headerChange(metadata.header)

      } // swapdata
      // Identify this as a private method to see if babel works.
      // resolveAttributes

    }]);

    return metadatamanager;
  }(); // metadatamanager


  function _resolveHeaderChange2(newHeader) {
    // `resolveHeaderChange' updates the data storage to match the provided `newHeader'. Only the properties of `newHeader' that are congruent with the data storage are changed, and others are ignored.
    var obj = this; // cfData -> data

    var data = this.data; // Go through the new header. The changes require also the crossfilter dimensions to be adjusted.

    Object.keys(newHeader).forEach(function (key) {
      // Find the differences for this category that need to be resolved. 'diff' has items aMinusB (in current, but not in new) and bMinusA ( in new, but not in current)
      var diff = setDifference(data[key], newHeader[key]);

      switch (key) {
        case "categoricalProperties":
          // Dimensions first
          _classPrivateFieldLooseBase(obj, _resolveDimensions)[_resolveDimensions](data.categoricalDims, diff); // Metadata dimensions have precomputed unique values. Create these ones for new variables, and delete any unnecessary ones.


          _classPrivateFieldLooseBase(obj, _resolveUniqueValues)[_resolveUniqueValues](data.categoricalUniqueValues, diff);

          break;

        case "ordinalProperties":
          // Dimensions first
          _classPrivateFieldLooseBase(obj, _resolveDimensions)[_resolveDimensions](data.ordinalDims, diff); // Data dimensions have corresponding histogram ranges. Delete unnecessary ones, and create necessary ones.


          _classPrivateFieldLooseBase(obj, _resolveHistogramRanges)[_resolveHistogramRanges](data.histogramSelectedRanges, diff);

          break;
      } // switch
      // Resolve the header.


      data[key] = newHeader[key];
    }); // forEach
  }

  function _resolveDimensions2(dims, diff) {
    // `resolveDimensions' takes in an object `dims' that contains crossfilter dimensions, and updates it using the difference information supplied by an object `diff'.
    var cf = this.data.cf; // Those in A, but not in B, must have their cf dimensions removed.

    diff.aMinusB.forEach(function (varName) {
      delete dims[varName];
    }); // forEach
    // Those in B, but not in A, must have cf dimensions created.

    diff.bMinusA.forEach(function (varName) {
      dims[varName] = cf.dimension(function (d) {
        return d[varName];
      });
    }); // forEach
  }

  function _resolveUniqueValues2(vals, diff) {
    var obj = this;

    _classPrivateFieldLooseBase(obj, _resolveAttributes)[_resolveAttributes](vals, diff, function (varName) {
      // Find all the unique values for a particular variable.
      return unique$1(obj.data.cf.all().map(function (d) {
        return d[varName];
      })); // unique
    }); // resolveAttributes

  }

  function _resolveHistogramRanges2(vals, diff) {
    var obj = this;

    _classPrivateFieldLooseBase(obj, _resolveAttributes)[_resolveAttributes](vals, diff, function (varName) {
      // Find the max range for the histogram.
      var tasks = dbsliceData.data.cf.all();
      return d3.extent(tasks, function (d) {
        return d[varName];
      });
    }); // resolveAttributes

  }

  function _resolveAttributes2(vals, diff, populate) {
    // Vals is an object of attributes that  needs to be resolved. The resolution of the attributes is given by diff. Populate is a function that states how that attribute should be populated if it's being created, and is passed in as it may need to be used multiple times.
    // Delete
    diff.aMinusB.forEach(function (varName) {
      delete vals[varName];
    }); // Variables that are in 'new', but not in 'old'.

    diff.bMinusA.forEach(function (varName) {
      // If a populate function is defined, then create an entry, otherwise create an empty one.
      if (populate) {
        vals[varName] = populate(varName);
      } else {
        vals[varName] = [];
      } // if

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
      value: function single(classref, filename) {
        var obj = this; // Check if this file already exists loaded in. Only unique filenames are saved, so this should only return a single item in the array.

        var libraryEntry = obj.retrieveByFilenames([filename])[0];

        if (libraryEntry) {
          return libraryEntry;
        } else {
          // Initiate loading. After loading if the file has loaded correctly it has some content and can be added to internal storage.
          var fileobj = new classref(filename);
          fileobj.load();
          obj.store(fileobj);
          return fileobj.promise;
        } // if

      } // single

    }, {
      key: "store",
      value: function store(fileobj) {
        var obj = this;
        fileobj.promise.then(function (fileobj) {
          // Other files should be stored if they have any content.
          if (fileobj.content) {
            // Successfuly loaded files.
            obj.files.push(fileobj);
          } else {
            // Errors were incurred.
            obj.failed.push(fileobj);
          } // if

        }); // then
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

  // Entry point for the bundling. Build up the session here. Then index.html just runs the bundled javascript file.

  var testrequired = ["./data/m_c3s.csv"];
  var library = new filelibrary();
  library.required = testrequired; // The metadatamanager should observe the metadatafiles

  var manager = new metadatamanager(library.files);
  console.log(library, manager); // Print the content of the library now.

  console.log(library.files);
  /* Request a single metadata file. The input for files should be an object:
  	file = {
  		url: url,
  		filename: filename
  	}
   */

  library.single(metadataFile, {
    url: "./data/m_c3s.csv",
    filename: "./data/m_c3s.csv"
  });
  console.log(library.files);
  console.log(manager.files);

}());
//# sourceMappingURL=dbslice.js.map
