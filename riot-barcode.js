(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, basedir, module) {
		return module = {
		  path: basedir,
		  exports: {},
		  require: function (path, base) {
	      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
	    }
		}, fn(module, module.exports), module.exports;
	}

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
	}

	/* Riot v4.13.4, @license MIT */
	/**
	 * Convert a string from camel case to dash-case
	 * @param   {string} string - probably a component tag name
	 * @returns {string} component name normalized
	 */
	function camelToDashCase(string) {
	  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
	/**
	 * Convert a string containing dashes to camel case
	 * @param   {string} string - input string
	 * @returns {string} my-string -> myString
	 */

	function dashToCamelCase(string) {
	  return string.replace(/-(\w)/g, (_, c) => c.toUpperCase());
	}

	/**
	 * Get all the element attributes as object
	 * @param   {HTMLElement} element - DOM node we want to parse
	 * @returns {Object} all the attributes found as a key value pairs
	 */

	function DOMattributesToObject(element) {
	  return Array.from(element.attributes).reduce((acc, attribute) => {
	    acc[dashToCamelCase(attribute.name)] = attribute.value;
	    return acc;
	  }, {});
	}
	/**
	 * Move all the child nodes from a source tag to another
	 * @param   {HTMLElement} source - source node
	 * @param   {HTMLElement} target - target node
	 * @returns {undefined} it's a void method ¯\_(ツ)_/¯
	 */
	// Ignore this helper because it's needed only for svg tags

	function moveChildren(source, target) {
	  if (source.firstChild) {
	    target.appendChild(source.firstChild);
	    moveChildren(source, target);
	  }
	}
	/**
	 * Remove the child nodes from any DOM node
	 * @param   {HTMLElement} node - target node
	 * @returns {undefined}
	 */

	function cleanNode(node) {
	  clearChildren(node.childNodes);
	}
	/**
	 * Clear multiple children in a node
	 * @param   {HTMLElement[]} children - direct children nodes
	 * @returns {undefined}
	 */

	function clearChildren(children) {
	  Array.from(children).forEach(removeNode);
	}
	/**
	 * Remove a node from the DOM
	 * @param   {HTMLElement} node - target node
	 * @returns {undefined}
	 */

	function removeNode(node) {
	  const {
	    parentNode
	  } = node;
	  if (node.remove) node.remove();
	  /* istanbul ignore else */
	  else if (parentNode) parentNode.removeChild(node);
	}

	const EACH = 0;
	const IF = 1;
	const SIMPLE = 2;
	const TAG = 3;
	const SLOT = 4;
	var bindingTypes = {
	  EACH,
	  IF,
	  SIMPLE,
	  TAG,
	  SLOT
	};

	const ATTRIBUTE = 0;
	const EVENT = 1;
	const TEXT = 2;
	const VALUE = 3;
	var expressionTypes = {
	  ATTRIBUTE,
	  EVENT,
	  TEXT,
	  VALUE
	};

	/**
	 * Create the template meta object in case of <template> fragments
	 * @param   {TemplateChunk} componentTemplate - template chunk object
	 * @returns {Object} the meta property that will be passed to the mount function of the TemplateChunk
	 */
	function createTemplateMeta(componentTemplate) {
	  const fragment = componentTemplate.dom.cloneNode(true);
	  return {
	    avoidDOMInjection: true,
	    fragment,
	    children: Array.from(fragment.childNodes)
	  };
	}

	const {
	  indexOf,
	  slice
	} = [];

	const append = (get, parent, children, start, end, before) => {
	  const isSelect = ('selectedIndex' in parent);
	  let noSelection = isSelect;

	  while (start < end) {
	    const child = get(children[start], 1);
	    parent.insertBefore(child, before);

	    if (isSelect && noSelection && child.selected) {
	      noSelection = !noSelection;
	      let {
	        selectedIndex
	      } = parent;
	      parent.selectedIndex = selectedIndex < 0 ? start : indexOf.call(parent.querySelectorAll('option'), child);
	    }

	    start++;
	  }
	};
	const eqeq = (a, b) => a == b;
	const identity = O => O;
	const indexOf$1 = (moreNodes, moreStart, moreEnd, lessNodes, lessStart, lessEnd, compare) => {
	  const length = lessEnd - lessStart;
	  /* istanbul ignore if */

	  if (length < 1) return -1;

	  while (moreEnd - moreStart >= length) {
	    let m = moreStart;
	    let l = lessStart;

	    while (m < moreEnd && l < lessEnd && compare(moreNodes[m], lessNodes[l])) {
	      m++;
	      l++;
	    }

	    if (l === lessEnd) return moreStart;
	    moreStart = m + 1;
	  }

	  return -1;
	};
	const isReversed = (futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare) => {
	  while (currentStart < currentEnd && compare(currentNodes[currentStart], futureNodes[futureEnd - 1])) {
	    currentStart++;
	    futureEnd--;
	  }
	  return futureEnd === 0;
	};
	const next = (get, list, i, length, before) => i < length ? get(list[i], 0) : 0 < i ? get(list[i - 1], -0).nextSibling : before;
	const remove = (get, children, start, end) => {
	  while (start < end) drop(get(children[start++], -1));
	}; // - - - - - - - - - - - - - - - - - - -
	// diff related constants and utilities
	// - - - - - - - - - - - - - - - - - - -

	const DELETION = -1;
	const INSERTION = 1;
	const SKIP = 0;
	const SKIP_OND = 50;

	const HS = (futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges) => {
	  let k = 0;
	  /* istanbul ignore next */

	  let minLen = futureChanges < currentChanges ? futureChanges : currentChanges;
	  const link = Array(minLen++);
	  const tresh = Array(minLen);
	  tresh[0] = -1;

	  for (let i = 1; i < minLen; i++) tresh[i] = currentEnd;

	  const nodes = currentNodes.slice(currentStart, currentEnd);

	  for (let i = futureStart; i < futureEnd; i++) {
	    const index = nodes.indexOf(futureNodes[i]);

	    if (-1 < index) {
	      const idxInOld = index + currentStart;
	      k = findK(tresh, minLen, idxInOld);
	      /* istanbul ignore else */

	      if (-1 < k) {
	        tresh[k] = idxInOld;
	        link[k] = {
	          newi: i,
	          oldi: idxInOld,
	          prev: link[k - 1]
	        };
	      }
	    }
	  }

	  k = --minLen;
	  --currentEnd;

	  while (tresh[k] > currentEnd) --k;

	  minLen = currentChanges + futureChanges - k;
	  const diff = Array(minLen);
	  let ptr = link[k];
	  --futureEnd;

	  while (ptr) {
	    const {
	      newi,
	      oldi
	    } = ptr;

	    while (futureEnd > newi) {
	      diff[--minLen] = INSERTION;
	      --futureEnd;
	    }

	    while (currentEnd > oldi) {
	      diff[--minLen] = DELETION;
	      --currentEnd;
	    }

	    diff[--minLen] = SKIP;
	    --futureEnd;
	    --currentEnd;
	    ptr = ptr.prev;
	  }

	  while (futureEnd >= futureStart) {
	    diff[--minLen] = INSERTION;
	    --futureEnd;
	  }

	  while (currentEnd >= currentStart) {
	    diff[--minLen] = DELETION;
	    --currentEnd;
	  }

	  return diff;
	}; // this is pretty much the same petit-dom code without the delete map part
	// https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L556-L561


	const OND = (futureNodes, futureStart, rows, currentNodes, currentStart, cols, compare) => {
	  const length = rows + cols;
	  const v = [];
	  let d, k, r, c, pv, cv, pd;

	  outer: for (d = 0; d <= length; d++) {
	    /* istanbul ignore if */
	    if (d > SKIP_OND) return null;
	    pd = d - 1;
	    /* istanbul ignore next */

	    pv = d ? v[d - 1] : [0, 0];
	    cv = v[d] = [];

	    for (k = -d; k <= d; k += 2) {
	      if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
	        c = pv[pd + k + 1];
	      } else {
	        c = pv[pd + k - 1] + 1;
	      }

	      r = c - k;

	      while (c < cols && r < rows && compare(currentNodes[currentStart + c], futureNodes[futureStart + r])) {
	        c++;
	        r++;
	      }

	      if (c === cols && r === rows) {
	        break outer;
	      }

	      cv[d + k] = c;
	    }
	  }

	  const diff = Array(d / 2 + length / 2);
	  let diffIdx = diff.length - 1;

	  for (d = v.length - 1; d >= 0; d--) {
	    while (c > 0 && r > 0 && compare(currentNodes[currentStart + c - 1], futureNodes[futureStart + r - 1])) {
	      // diagonal edge = equality
	      diff[diffIdx--] = SKIP;
	      c--;
	      r--;
	    }

	    if (!d) break;
	    pd = d - 1;
	    /* istanbul ignore next */

	    pv = d ? v[d - 1] : [0, 0];
	    k = c - r;

	    if (k === -d || k !== d && pv[pd + k - 1] < pv[pd + k + 1]) {
	      // vertical edge = insertion
	      r--;
	      diff[diffIdx--] = INSERTION;
	    } else {
	      // horizontal edge = deletion
	      c--;
	      diff[diffIdx--] = DELETION;
	    }
	  }

	  return diff;
	};

	const applyDiff = (diff, get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before) => {
	  const live = [];
	  const length = diff.length;
	  let currentIndex = currentStart;
	  let i = 0;

	  while (i < length) {
	    switch (diff[i++]) {
	      case SKIP:
	        futureStart++;
	        currentIndex++;
	        break;

	      case INSERTION:
	        // TODO: bulk appends for sequential nodes
	        live.push(futureNodes[futureStart]);
	        append(get, parentNode, futureNodes, futureStart++, futureStart, currentIndex < currentLength ? get(currentNodes[currentIndex], 0) : before);
	        break;

	      case DELETION:
	        currentIndex++;
	        break;
	    }
	  }

	  i = 0;

	  while (i < length) {
	    switch (diff[i++]) {
	      case SKIP:
	        currentStart++;
	        break;

	      case DELETION:
	        // TODO: bulk removes for sequential nodes
	        if (-1 < live.indexOf(currentNodes[currentStart])) currentStart++;else remove(get, currentNodes, currentStart++, currentStart);
	        break;
	    }
	  }
	};

	const findK = (ktr, length, j) => {
	  let lo = 1;
	  let hi = length;

	  while (lo < hi) {
	    const mid = (lo + hi) / 2 >>> 0;
	    if (j < ktr[mid]) hi = mid;else lo = mid + 1;
	  }

	  return lo;
	};

	const smartDiff = (get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before) => {
	  applyDiff(OND(futureNodes, futureStart, futureChanges, currentNodes, currentStart, currentChanges, compare) || HS(futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges), get, parentNode, futureNodes, futureStart, currentNodes, currentStart, currentLength, before);
	};

	const drop = node => (node.remove || dropChild).call(node);

	function dropChild() {
	  const {
	    parentNode
	  } = this;
	  /* istanbul ignore else */

	  if (parentNode) parentNode.removeChild(this);
	}

	/*! (c) 2018 Andrea Giammarchi (ISC) */

	const domdiff = (parentNode, // where changes happen
	currentNodes, // Array of current items/nodes
	futureNodes, // Array of future items/nodes
	options // optional object with one of the following properties
	//  before: domNode
	//  compare(generic, generic) => true if same generic
	//  node(generic) => Node
	) => {
	  if (!options) options = {};
	  const compare = options.compare || eqeq;
	  const get = options.node || identity;
	  const before = options.before == null ? null : get(options.before, 0);
	  const currentLength = currentNodes.length;
	  let currentEnd = currentLength;
	  let currentStart = 0;
	  let futureEnd = futureNodes.length;
	  let futureStart = 0; // common prefix

	  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentStart], futureNodes[futureStart])) {
	    currentStart++;
	    futureStart++;
	  } // common suffix


	  while (currentStart < currentEnd && futureStart < futureEnd && compare(currentNodes[currentEnd - 1], futureNodes[futureEnd - 1])) {
	    currentEnd--;
	    futureEnd--;
	  }

	  const currentSame = currentStart === currentEnd;
	  const futureSame = futureStart === futureEnd; // same list

	  if (currentSame && futureSame) return futureNodes; // only stuff to add

	  if (currentSame && futureStart < futureEnd) {
	    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentStart, currentLength, before));
	    return futureNodes;
	  } // only stuff to remove


	  if (futureSame && currentStart < currentEnd) {
	    remove(get, currentNodes, currentStart, currentEnd);
	    return futureNodes;
	  }

	  const currentChanges = currentEnd - currentStart;
	  const futureChanges = futureEnd - futureStart;
	  let i = -1; // 2 simple indels: the shortest sequence is a subsequence of the longest

	  if (currentChanges < futureChanges) {
	    i = indexOf$1(futureNodes, futureStart, futureEnd, currentNodes, currentStart, currentEnd, compare); // inner diff

	    if (-1 < i) {
	      append(get, parentNode, futureNodes, futureStart, i, get(currentNodes[currentStart], 0));
	      append(get, parentNode, futureNodes, i + currentChanges, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
	      return futureNodes;
	    }
	  }
	  /* istanbul ignore else */
	  else if (futureChanges < currentChanges) {
	      i = indexOf$1(currentNodes, currentStart, currentEnd, futureNodes, futureStart, futureEnd, compare); // outer diff

	      if (-1 < i) {
	        remove(get, currentNodes, currentStart, i);
	        remove(get, currentNodes, i + futureChanges, currentEnd);
	        return futureNodes;
	      }
	    } // common case with one replacement for many nodes
	  // or many nodes replaced for a single one

	  /* istanbul ignore else */


	  if (currentChanges < 2 || futureChanges < 2) {
	    append(get, parentNode, futureNodes, futureStart, futureEnd, get(currentNodes[currentStart], 0));
	    remove(get, currentNodes, currentStart, currentEnd);
	    return futureNodes;
	  } // the half match diff part has been skipped in petit-dom
	  // https://github.com/yelouafi/petit-dom/blob/bd6f5c919b5ae5297be01612c524c40be45f14a7/src/vdom.js#L391-L397
	  // accordingly, I think it's safe to skip in here too
	  // if one day it'll come out like the speediest thing ever to do
	  // then I might add it in here too
	  // Extra: before going too fancy, what about reversed lists ?
	  //        This should bail out pretty quickly if that's not the case.


	  if (currentChanges === futureChanges && isReversed(futureNodes, futureEnd, currentNodes, currentStart, currentEnd, compare)) {
	    append(get, parentNode, futureNodes, futureStart, futureEnd, next(get, currentNodes, currentEnd, currentLength, before));
	    return futureNodes;
	  } // last resort through a smart diff


	  smartDiff(get, parentNode, futureNodes, futureStart, futureEnd, futureChanges, currentNodes, currentStart, currentEnd, currentChanges, currentLength, compare, before);
	  return futureNodes;
	};

	/**
	 * Quick type checking
	 * @param   {*} element - anything
	 * @param   {string} type - type definition
	 * @returns {boolean} true if the type corresponds
	 */
	function checkType(element, type) {
	  return typeof element === type;
	}
	/**
	 * Check if an element is part of an svg
	 * @param   {HTMLElement}  el - element to check
	 * @returns {boolean} true if we are in an svg context
	 */

	function isSvg(el) {
	  const owner = el.ownerSVGElement;
	  return !!owner || owner === null;
	}
	/**
	 * Check if an element is a template tag
	 * @param   {HTMLElement}  el - element to check
	 * @returns {boolean} true if it's a <template>
	 */

	function isTemplate(el) {
	  return !isNil(el.content);
	}
	/**
	 * Check that will be passed if its argument is a function
	 * @param   {*} value - value to check
	 * @returns {boolean} - true if the value is a function
	 */

	function isFunction(value) {
	  return checkType(value, 'function');
	}
	/**
	 * Check if a value is a Boolean
	 * @param   {*}  value - anything
	 * @returns {boolean} true only for the value is a boolean
	 */

	function isBoolean(value) {
	  return checkType(value, 'boolean');
	}
	/**
	 * Check if a value is an Object
	 * @param   {*}  value - anything
	 * @returns {boolean} true only for the value is an object
	 */

	function isObject(value) {
	  return !isNil(value) && checkType(value, 'object');
	}
	/**
	 * Check if a value is null or undefined
	 * @param   {*}  value - anything
	 * @returns {boolean} true only for the 'undefined' and 'null' types
	 */

	function isNil(value) {
	  return value === null || value === undefined;
	}

	const UNMOUNT_SCOPE = Symbol('unmount');
	const EachBinding = Object.seal({
	  // dynamic binding properties
	  // childrenMap: null,
	  // node: null,
	  // root: null,
	  // condition: null,
	  // evaluate: null,
	  // template: null,
	  // isTemplateTag: false,
	  nodes: [],

	  // getKey: null,
	  // indexName: null,
	  // itemName: null,
	  // afterPlaceholder: null,
	  // placeholder: null,
	  // API methods
	  mount(scope, parentScope) {
	    return this.update(scope, parentScope);
	  },

	  update(scope, parentScope) {
	    const {
	      placeholder,
	      nodes,
	      childrenMap
	    } = this;
	    const collection = scope === UNMOUNT_SCOPE ? null : this.evaluate(scope);
	    const items = collection ? Array.from(collection) : [];
	    const parent = placeholder.parentNode; // prepare the diffing

	    const {
	      newChildrenMap,
	      batches,
	      futureNodes
	    } = createPatch(items, scope, parentScope, this); // patch the DOM only if there are new nodes

	    domdiff(parent, nodes, futureNodes, {
	      before: placeholder,
	      node: patch(Array.from(childrenMap.values()), parentScope)
	    }); // trigger the mounts and the updates

	    batches.forEach(fn => fn()); // update the children map

	    this.childrenMap = newChildrenMap;
	    this.nodes = futureNodes;
	    return this;
	  },

	  unmount(scope, parentScope) {
	    this.update(UNMOUNT_SCOPE, parentScope);
	    return this;
	  }

	});
	/**
	 * Patch the DOM while diffing
	 * @param   {TemplateChunk[]} redundant - redundant tepmplate chunks
	 * @param   {*} parentScope - scope of the parent template
	 * @returns {Function} patch function used by domdiff
	 */

	function patch(redundant, parentScope) {
	  return (item, info) => {
	    if (info < 0) {
	      const element = redundant.pop();

	      if (element) {
	        const {
	          template,
	          context
	        } = element; // notice that we pass null as last argument because
	        // the root node and its children will be removed by domdiff

	        template.unmount(context, parentScope, null);
	      }
	    }

	    return item;
	  };
	}
	/**
	 * Check whether a template must be filtered from a loop
	 * @param   {Function} condition - filter function
	 * @param   {Object} context - argument passed to the filter function
	 * @returns {boolean} true if this item should be skipped
	 */


	function mustFilterItem(condition, context) {
	  return condition ? Boolean(condition(context)) === false : false;
	}
	/**
	 * Extend the scope of the looped template
	 * @param   {Object} scope - current template scope
	 * @param   {string} options.itemName - key to identify the looped item in the new context
	 * @param   {string} options.indexName - key to identify the index of the looped item
	 * @param   {number} options.index - current index
	 * @param   {*} options.item - collection item looped
	 * @returns {Object} enhanced scope object
	 */


	function extendScope(scope, _ref) {
	  let {
	    itemName,
	    indexName,
	    index,
	    item
	  } = _ref;
	  scope[itemName] = item;
	  if (indexName) scope[indexName] = index;
	  return scope;
	}
	/**
	 * Loop the current template items
	 * @param   {Array} items - expression collection value
	 * @param   {*} scope - template scope
	 * @param   {*} parentScope - scope of the parent template
	 * @param   {EeachBinding} binding - each binding object instance
	 * @returns {Object} data
	 * @returns {Map} data.newChildrenMap - a Map containing the new children template structure
	 * @returns {Array} data.batches - array containing the template lifecycle functions to trigger
	 * @returns {Array} data.futureNodes - array containing the nodes we need to diff
	 */


	function createPatch(items, scope, parentScope, binding) {
	  const {
	    condition,
	    template,
	    childrenMap,
	    itemName,
	    getKey,
	    indexName,
	    root,
	    isTemplateTag
	  } = binding;
	  const newChildrenMap = new Map();
	  const batches = [];
	  const futureNodes = [];
	  items.forEach((item, index) => {
	    const context = extendScope(Object.create(scope), {
	      itemName,
	      indexName,
	      index,
	      item
	    });
	    const key = getKey ? getKey(context) : index;
	    const oldItem = childrenMap.get(key);

	    if (mustFilterItem(condition, context)) {
	      return;
	    }

	    const componentTemplate = oldItem ? oldItem.template : template.clone();
	    const el = oldItem ? componentTemplate.el : root.cloneNode();
	    const mustMount = !oldItem;
	    const meta = isTemplateTag && mustMount ? createTemplateMeta(componentTemplate) : {};

	    if (mustMount) {
	      batches.push(() => componentTemplate.mount(el, context, parentScope, meta));
	    } else {
	      batches.push(() => componentTemplate.update(context, parentScope));
	    } // create the collection of nodes to update or to add
	    // in case of template tags we need to add all its children nodes


	    if (isTemplateTag) {
	      const children = meta.children || componentTemplate.children;
	      futureNodes.push(...children);
	    } else {
	      futureNodes.push(el);
	    } // delete the old item from the children map


	    childrenMap.delete(key); // update the children map

	    newChildrenMap.set(key, {
	      template: componentTemplate,
	      context,
	      index
	    });
	  });
	  return {
	    newChildrenMap,
	    batches,
	    futureNodes
	  };
	}

	function create(node, _ref2) {
	  let {
	    evaluate,
	    condition,
	    itemName,
	    indexName,
	    getKey,
	    template
	  } = _ref2;
	  const placeholder = document.createTextNode('');
	  const parent = node.parentNode;
	  const root = node.cloneNode();
	  parent.insertBefore(placeholder, node);
	  removeNode(node);
	  return Object.assign({}, EachBinding, {
	    childrenMap: new Map(),
	    node,
	    root,
	    condition,
	    evaluate,
	    isTemplateTag: isTemplate(root),
	    template: template.createDOM(node),
	    getKey,
	    indexName,
	    itemName,
	    placeholder
	  });
	}

	/**
	 * Binding responsible for the `if` directive
	 */

	const IfBinding = Object.seal({
	  // dynamic binding properties
	  // node: null,
	  // evaluate: null,
	  // isTemplateTag: false,
	  // placeholder: null,
	  // template: null,
	  // API methods
	  mount(scope, parentScope) {
	    return this.update(scope, parentScope);
	  },

	  update(scope, parentScope) {
	    const value = !!this.evaluate(scope);
	    const mustMount = !this.value && value;
	    const mustUnmount = this.value && !value;

	    const mount = () => {
	      const pristine = this.node.cloneNode();
	      this.placeholder.parentNode.insertBefore(pristine, this.placeholder);
	      this.template = this.template.clone();
	      this.template.mount(pristine, scope, parentScope);
	    };

	    switch (true) {
	      case mustMount:
	        mount();
	        break;

	      case mustUnmount:
	        this.unmount(scope);
	        break;

	      default:
	        if (value) this.template.update(scope, parentScope);
	    }

	    this.value = value;
	    return this;
	  },

	  unmount(scope, parentScope) {
	    this.template.unmount(scope, parentScope, true);
	    return this;
	  }

	});
	function create$1(node, _ref) {
	  let {
	    evaluate,
	    template
	  } = _ref;
	  const parent = node.parentNode;
	  const placeholder = document.createTextNode('');
	  parent.insertBefore(placeholder, node);
	  removeNode(node);
	  return Object.assign({}, IfBinding, {
	    node,
	    evaluate,
	    placeholder,
	    template: template.createDOM(node)
	  });
	}

	/**
	 * Throw an error with a descriptive message
	 * @param   { string } message - error message
	 * @returns { undefined } hoppla.. at this point the program should stop working
	 */

	function panic(message) {
	  throw new Error(message);
	}
	/**
	 * Returns the memoized (cached) function.
	 * // borrowed from https://www.30secondsofcode.org/js/s/memoize
	 * @param {Function} fn - function to memoize
	 * @returns {Function} memoize function
	 */

	function memoize(fn) {
	  const cache = new Map();

	  const cached = val => {
	    return cache.has(val) ? cache.get(val) : cache.set(val, fn.call(this, val)) && cache.get(val);
	  };

	  cached.cache = cache;
	  return cached;
	}
	/**
	 * Evaluate a list of attribute expressions
	 * @param   {Array} attributes - attribute expressions generated by the riot compiler
	 * @returns {Object} key value pairs with the result of the computation
	 */

	function evaluateAttributeExpressions(attributes) {
	  return attributes.reduce((acc, attribute) => {
	    const {
	      value,
	      type
	    } = attribute;

	    switch (true) {
	      // spread attribute
	      case !attribute.name && type === ATTRIBUTE:
	        return Object.assign({}, acc, value);
	      // value attribute

	      case type === VALUE:
	        acc.value = attribute.value;
	        break;
	      // normal attributes

	      default:
	        acc[dashToCamelCase(attribute.name)] = attribute.value;
	    }

	    return acc;
	  }, {});
	}

	const REMOVE_ATTRIBUTE = 'removeAttribute';
	const SET_ATTIBUTE = 'setAttribute';
	const ElementProto = typeof Element === 'undefined' ? {} : Element.prototype;
	const isNativeHtmlProperty = memoize(name => ElementProto.hasOwnProperty(name)); // eslint-disable-line

	/**
	 * Add all the attributes provided
	 * @param   {HTMLElement} node - target node
	 * @param   {Object} attributes - object containing the attributes names and values
	 * @returns {undefined} sorry it's a void function :(
	 */

	function setAllAttributes(node, attributes) {
	  Object.entries(attributes).forEach((_ref) => {
	    let [name, value] = _ref;
	    return attributeExpression(node, {
	      name
	    }, value);
	  });
	}
	/**
	 * Remove all the attributes provided
	 * @param   {HTMLElement} node - target node
	 * @param   {Object} newAttributes - object containing all the new attribute names
	 * @param   {Object} oldAttributes - object containing all the old attribute names
	 * @returns {undefined} sorry it's a void function :(
	 */


	function removeAllAttributes(node, newAttributes, oldAttributes) {
	  const newKeys = newAttributes ? Object.keys(newAttributes) : [];
	  Object.keys(oldAttributes).filter(name => !newKeys.includes(name)).forEach(attribute => node.removeAttribute(attribute));
	}
	/**
	 * This methods handles the DOM attributes updates
	 * @param   {HTMLElement} node - target node
	 * @param   {Object} expression - expression object
	 * @param   {string} expression.name - attribute name
	 * @param   {*} value - new expression value
	 * @param   {*} oldValue - the old expression cached value
	 * @returns {undefined}
	 */


	function attributeExpression(node, _ref2, value, oldValue) {
	  let {
	    name
	  } = _ref2;

	  // is it a spread operator? {...attributes}
	  if (!name) {
	    if (oldValue) {
	      // remove all the old attributes
	      removeAllAttributes(node, value, oldValue);
	    } // is the value still truthy?


	    if (value) {
	      setAllAttributes(node, value);
	    }

	    return;
	  } // handle boolean attributes


	  if (!isNativeHtmlProperty(name) && (isBoolean(value) || isObject(value) || isFunction(value))) {
	    node[name] = value;
	  }

	  node[getMethod(value)](name, normalizeValue(name, value));
	}
	/**
	 * Get the attribute modifier method
	 * @param   {*} value - if truthy we return `setAttribute` othewise `removeAttribute`
	 * @returns {string} the node attribute modifier method name
	 */

	function getMethod(value) {
	  return isNil(value) || value === false || value === '' || isObject(value) || isFunction(value) ? REMOVE_ATTRIBUTE : SET_ATTIBUTE;
	}
	/**
	 * Get the value as string
	 * @param   {string} name - attribute name
	 * @param   {*} value - user input value
	 * @returns {string} input value as string
	 */


	function normalizeValue(name, value) {
	  // be sure that expressions like selected={ true } will be always rendered as selected='selected'
	  if (value === true) return name;
	  return value;
	}

	const RE_EVENTS_PREFIX = /^on/;

	const getCallbackAndOptions = value => Array.isArray(value) ? value : [value, false]; // see also https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38


	const EventListener = {
	  handleEvent(event) {
	    this[event.type](event);
	  }

	};
	const ListenersWeakMap = new WeakMap();

	const createListener = node => {
	  const listener = Object.create(EventListener);
	  ListenersWeakMap.set(node, listener);
	  return listener;
	};
	/**
	 * Set a new event listener
	 * @param   {HTMLElement} node - target node
	 * @param   {Object} expression - expression object
	 * @param   {string} expression.name - event name
	 * @param   {*} value - new expression value
	 * @returns {value} the callback just received
	 */


	function eventExpression(node, _ref, value) {
	  let {
	    name
	  } = _ref;
	  const normalizedEventName = name.replace(RE_EVENTS_PREFIX, '');
	  const eventListener = ListenersWeakMap.get(node) || createListener(node);
	  const [callback, options] = getCallbackAndOptions(value);
	  const handler = eventListener[normalizedEventName];
	  const mustRemoveEvent = handler && !callback;
	  const mustAddEvent = callback && !handler;

	  if (mustRemoveEvent) {
	    node.removeEventListener(normalizedEventName, eventListener);
	  }

	  if (mustAddEvent) {
	    node.addEventListener(normalizedEventName, eventListener, options);
	  }

	  eventListener[normalizedEventName] = callback;
	}

	/**
	 * Normalize the user value in order to render a empty string in case of falsy values
	 * @param   {*} value - user input value
	 * @returns {string} hopefully a string
	 */

	function normalizeStringValue(value) {
	  return isNil(value) ? '' : value;
	}

	/**
	 * Get the the target text node to update or create one from of a comment node
	 * @param   {HTMLElement} node - any html element containing childNodes
	 * @param   {number} childNodeIndex - index of the text node in the childNodes list
	 * @returns {HTMLTextNode} the text node to update
	 */

	const getTextNode = (node, childNodeIndex) => {
	  const target = node.childNodes[childNodeIndex];

	  if (target.nodeType === Node.COMMENT_NODE) {
	    const textNode = document.createTextNode('');
	    node.replaceChild(textNode, target);
	    return textNode;
	  }

	  return target;
	};
	/**
	 * This methods handles a simple text expression update
	 * @param   {HTMLElement} node - target node
	 * @param   {Object} data - expression object
	 * @param   {*} value - new expression value
	 * @returns {undefined}
	 */

	function textExpression(node, data, value) {
	  node.data = normalizeStringValue(value);
	}

	/**
	 * This methods handles the input fileds value updates
	 * @param   {HTMLElement} node - target node
	 * @param   {Object} expression - expression object
	 * @param   {*} value - new expression value
	 * @returns {undefined}
	 */

	function valueExpression(node, expression, value) {
	  node.value = normalizeStringValue(value);
	}

	var expressions = {
	  [ATTRIBUTE]: attributeExpression,
	  [EVENT]: eventExpression,
	  [TEXT]: textExpression,
	  [VALUE]: valueExpression
	};

	const Expression = Object.seal({
	  // Static props
	  // node: null,
	  // value: null,
	  // API methods

	  /**
	   * Mount the expression evaluating its initial value
	   * @param   {*} scope - argument passed to the expression to evaluate its current values
	   * @returns {Expression} self
	   */
	  mount(scope) {
	    // hopefully a pure function
	    this.value = this.evaluate(scope); // IO() DOM updates

	    apply(this, this.value);
	    return this;
	  },

	  /**
	   * Update the expression if its value changed
	   * @param   {*} scope - argument passed to the expression to evaluate its current values
	   * @returns {Expression} self
	   */
	  update(scope) {
	    // pure function
	    const value = this.evaluate(scope);

	    if (this.value !== value) {
	      // IO() DOM updates
	      apply(this, value);
	      this.value = value;
	    }

	    return this;
	  },

	  /**
	   * Expression teardown method
	   * @returns {Expression} self
	   */
	  unmount() {
	    // unmount only the event handling expressions
	    if (this.type === EVENT) apply(this, null);
	    return this;
	  }

	});
	/**
	 * IO() function to handle the DOM updates
	 * @param {Expression} expression - expression object
	 * @param {*} value - current expression value
	 * @returns {undefined}
	 */

	function apply(expression, value) {
	  return expressions[expression.type](expression.node, expression, value, expression.value);
	}

	function create$2(node, data) {
	  return Object.assign({}, Expression, data, {
	    node: data.type === TEXT ? getTextNode(node, data.childNodeIndex) : node
	  });
	}

	/**
	 * Create a flat object having as keys a list of methods that if dispatched will propagate
	 * on the whole collection
	 * @param   {Array} collection - collection to iterate
	 * @param   {Array<string>} methods - methods to execute on each item of the collection
	 * @param   {*} context - context returned by the new methods created
	 * @returns {Object} a new object to simplify the the nested methods dispatching
	 */
	function flattenCollectionMethods(collection, methods, context) {
	  return methods.reduce((acc, method) => {
	    return Object.assign({}, acc, {
	      [method]: scope => {
	        return collection.map(item => item[method](scope)) && context;
	      }
	    });
	  }, {});
	}

	function create$3(node, _ref) {
	  let {
	    expressions
	  } = _ref;
	  return Object.assign({}, flattenCollectionMethods(expressions.map(expression => create$2(node, expression)), ['mount', 'update', 'unmount']));
	}

	// Riot.js constants that can be used accross more modules
	const COMPONENTS_IMPLEMENTATION_MAP = new Map(),
	      DOM_COMPONENT_INSTANCE_PROPERTY = Symbol('riot-component'),
	      PLUGINS_SET = new Set(),
	      IS_DIRECTIVE = 'is',
	      VALUE_ATTRIBUTE = 'value',
	      MOUNT_METHOD_KEY = 'mount',
	      UPDATE_METHOD_KEY = 'update',
	      UNMOUNT_METHOD_KEY = 'unmount',
	      SHOULD_UPDATE_KEY = 'shouldUpdate',
	      ON_BEFORE_MOUNT_KEY = 'onBeforeMount',
	      ON_MOUNTED_KEY = 'onMounted',
	      ON_BEFORE_UPDATE_KEY = 'onBeforeUpdate',
	      ON_UPDATED_KEY = 'onUpdated',
	      ON_BEFORE_UNMOUNT_KEY = 'onBeforeUnmount',
	      ON_UNMOUNTED_KEY = 'onUnmounted',
	      PROPS_KEY = 'props',
	      STATE_KEY = 'state',
	      SLOTS_KEY = 'slots',
	      ROOT_KEY = 'root',
	      IS_PURE_SYMBOL = Symbol.for('pure'),
	      PARENT_KEY_SYMBOL = Symbol('parent'),
	      ATTRIBUTES_KEY_SYMBOL = Symbol('attributes'),
	      TEMPLATE_KEY_SYMBOL = Symbol('template');

	var globals = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP,
	  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY,
	  PLUGINS_SET: PLUGINS_SET,
	  IS_DIRECTIVE: IS_DIRECTIVE,
	  VALUE_ATTRIBUTE: VALUE_ATTRIBUTE,
	  MOUNT_METHOD_KEY: MOUNT_METHOD_KEY,
	  UPDATE_METHOD_KEY: UPDATE_METHOD_KEY,
	  UNMOUNT_METHOD_KEY: UNMOUNT_METHOD_KEY,
	  SHOULD_UPDATE_KEY: SHOULD_UPDATE_KEY,
	  ON_BEFORE_MOUNT_KEY: ON_BEFORE_MOUNT_KEY,
	  ON_MOUNTED_KEY: ON_MOUNTED_KEY,
	  ON_BEFORE_UPDATE_KEY: ON_BEFORE_UPDATE_KEY,
	  ON_UPDATED_KEY: ON_UPDATED_KEY,
	  ON_BEFORE_UNMOUNT_KEY: ON_BEFORE_UNMOUNT_KEY,
	  ON_UNMOUNTED_KEY: ON_UNMOUNTED_KEY,
	  PROPS_KEY: PROPS_KEY,
	  STATE_KEY: STATE_KEY,
	  SLOTS_KEY: SLOTS_KEY,
	  ROOT_KEY: ROOT_KEY,
	  IS_PURE_SYMBOL: IS_PURE_SYMBOL,
	  PARENT_KEY_SYMBOL: PARENT_KEY_SYMBOL,
	  ATTRIBUTES_KEY_SYMBOL: ATTRIBUTES_KEY_SYMBOL,
	  TEMPLATE_KEY_SYMBOL: TEMPLATE_KEY_SYMBOL
	});

	function extendParentScope(attributes, scope, parentScope) {
	  if (!attributes || !attributes.length) return parentScope;
	  const expressions = attributes.map(attr => Object.assign({}, attr, {
	    value: attr.evaluate(scope)
	  }));
	  return Object.assign(Object.create(parentScope || null), evaluateAttributeExpressions(expressions));
	} // this function is only meant to fix an edge case
	// https://github.com/riot/riot/issues/2842


	const getRealParent = (scope, parentScope) => parentScope ? parentScope === scope ? scope[PARENT_KEY_SYMBOL] : parentScope : undefined;

	const SlotBinding = Object.seal({
	  // dynamic binding properties
	  // node: null,
	  // name: null,
	  attributes: [],

	  // template: null,
	  getTemplateScope(scope, parentScope) {
	    return extendParentScope(this.attributes, scope, parentScope);
	  },

	  // API methods
	  mount(scope, parentScope) {
	    const templateData = scope.slots ? scope.slots.find((_ref) => {
	      let {
	        id
	      } = _ref;
	      return id === this.name;
	    }) : false;
	    const {
	      parentNode
	    } = this.node;
	    const realParent = getRealParent(scope, parentScope);
	    this.template = templateData && create$6(templateData.html, templateData.bindings).createDOM(parentNode);

	    if (this.template) {
	      this.template.mount(this.node, this.getTemplateScope(scope, realParent), realParent);
	      this.template.children = moveSlotInnerContent(this.node);
	    }

	    removeNode(this.node);
	    return this;
	  },

	  update(scope, parentScope) {
	    if (this.template) {
	      const realParent = getRealParent(scope, parentScope);
	      this.template.update(this.getTemplateScope(scope, realParent), realParent);
	    }

	    return this;
	  },

	  unmount(scope, parentScope, mustRemoveRoot) {
	    if (this.template) {
	      this.template.unmount(this.getTemplateScope(scope, parentScope), null, mustRemoveRoot);
	    }

	    return this;
	  }

	});
	/**
	 * Move the inner content of the slots outside of them
	 * @param   {HTMLNode} slot - slot node
	 * @param   {HTMLElement} children - array to fill with the child nodes detected
	 * @returns {HTMLElement[]} list of the node moved
	 */

	function moveSlotInnerContent(slot, children) {
	  if (children === void 0) {
	    children = [];
	  }

	  const child = slot.firstChild;

	  if (child) {
	    slot.parentNode.insertBefore(child, slot);
	    return [child, ...moveSlotInnerContent(slot)];
	  }

	  return children;
	}
	/**
	 * Create a single slot binding
	 * @param   {HTMLElement} node - slot node
	 * @param   {string} options.name - slot id
	 * @returns {Object} Slot binding object
	 */


	function createSlot(node, _ref2) {
	  let {
	    name,
	    attributes
	  } = _ref2;
	  return Object.assign({}, SlotBinding, {
	    attributes,
	    node,
	    name
	  });
	}

	/**
	 * Create a new tag object if it was registered before, otherwise fallback to the simple
	 * template chunk
	 * @param   {Function} component - component factory function
	 * @param   {Array<Object>} slots - array containing the slots markup
	 * @param   {Array} attributes - dynamic attributes that will be received by the tag element
	 * @returns {TagImplementation|TemplateChunk} a tag implementation or a template chunk as fallback
	 */

	function getTag(component, slots, attributes) {
	  if (slots === void 0) {
	    slots = [];
	  }

	  if (attributes === void 0) {
	    attributes = [];
	  }

	  // if this tag was registered before we will return its implementation
	  if (component) {
	    return component({
	      slots,
	      attributes
	    });
	  } // otherwise we return a template chunk


	  return create$6(slotsToMarkup(slots), [...slotBindings(slots), {
	    // the attributes should be registered as binding
	    // if we fallback to a normal template chunk
	    expressions: attributes.map(attr => {
	      return Object.assign({
	        type: ATTRIBUTE
	      }, attr);
	    })
	  }]);
	}
	/**
	 * Merge all the slots bindings into a single array
	 * @param   {Array<Object>} slots - slots collection
	 * @returns {Array<Bindings>} flatten bindings array
	 */


	function slotBindings(slots) {
	  return slots.reduce((acc, _ref) => {
	    let {
	      bindings
	    } = _ref;
	    return acc.concat(bindings);
	  }, []);
	}
	/**
	 * Merge all the slots together in a single markup string
	 * @param   {Array<Object>} slots - slots collection
	 * @returns {string} markup of all the slots in a single string
	 */


	function slotsToMarkup(slots) {
	  return slots.reduce((acc, slot) => {
	    return acc + slot.html;
	  }, '');
	}

	const TagBinding = Object.seal({
	  // dynamic binding properties
	  // node: null,
	  // evaluate: null,
	  // name: null,
	  // slots: null,
	  // tag: null,
	  // attributes: null,
	  // getComponent: null,
	  mount(scope) {
	    return this.update(scope);
	  },

	  update(scope, parentScope) {
	    const name = this.evaluate(scope); // simple update

	    if (name === this.name) {
	      this.tag.update(scope);
	    } else {
	      // unmount the old tag if it exists
	      this.unmount(scope, parentScope, true); // mount the new tag

	      this.name = name;
	      this.tag = getTag(this.getComponent(name), this.slots, this.attributes);
	      this.tag.mount(this.node, scope);
	    }

	    return this;
	  },

	  unmount(scope, parentScope, keepRootTag) {
	    if (this.tag) {
	      // keep the root tag
	      this.tag.unmount(keepRootTag);
	    }

	    return this;
	  }

	});
	function create$4(node, _ref2) {
	  let {
	    evaluate,
	    getComponent,
	    slots,
	    attributes
	  } = _ref2;
	  return Object.assign({}, TagBinding, {
	    node,
	    evaluate,
	    slots,
	    attributes,
	    getComponent
	  });
	}

	var bindings = {
	  [IF]: create$1,
	  [SIMPLE]: create$3,
	  [EACH]: create,
	  [TAG]: create$4,
	  [SLOT]: createSlot
	};

	/**
	 * Text expressions in a template tag will get childNodeIndex value normalized
	 * depending on the position of the <template> tag offset
	 * @param   {Expression[]} expressions - riot expressions array
	 * @param   {number} textExpressionsOffset - offset of the <template> tag
	 * @returns {Expression[]} expressions containing the text expressions normalized
	 */

	function fixTextExpressionsOffset(expressions, textExpressionsOffset) {
	  return expressions.map(e => e.type === TEXT ? Object.assign({}, e, {
	    childNodeIndex: e.childNodeIndex + textExpressionsOffset
	  }) : e);
	}
	/**
	 * Bind a new expression object to a DOM node
	 * @param   {HTMLElement} root - DOM node where to bind the expression
	 * @param   {Object} binding - binding data
	 * @param   {number|null} templateTagOffset - if it's defined we need to fix the text expressions childNodeIndex offset
	 * @returns {Binding} Binding object
	 */


	function create$5(root, binding, templateTagOffset) {
	  const {
	    selector,
	    type,
	    redundantAttribute,
	    expressions
	  } = binding; // find the node to apply the bindings

	  const node = selector ? root.querySelector(selector) : root; // remove eventually additional attributes created only to select this node

	  if (redundantAttribute) node.removeAttribute(redundantAttribute);
	  const bindingExpressions = expressions || []; // init the binding

	  return (bindings[type] || bindings[SIMPLE])(node, Object.assign({}, binding, {
	    expressions: templateTagOffset && !selector ? fixTextExpressionsOffset(bindingExpressions, templateTagOffset) : bindingExpressions
	  }));
	}

	function createHTMLTree(html, root) {
	  const template = isTemplate(root) ? root : document.createElement('template');
	  template.innerHTML = html;
	  return template.content;
	} // for svg nodes we need a bit more work


	function createSVGTree(html, container) {
	  // create the SVGNode
	  const svgNode = container.ownerDocument.importNode(new window.DOMParser().parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${html}</svg>`, 'application/xml').documentElement, true);
	  return svgNode;
	}
	/**
	 * Create the DOM that will be injected
	 * @param {Object} root - DOM node to find out the context where the fragment will be created
	 * @param   {string} html - DOM to create as string
	 * @returns {HTMLDocumentFragment|HTMLElement} a new html fragment
	 */


	function createDOMTree(root, html) {
	  if (isSvg(root)) return createSVGTree(html, root);
	  return createHTMLTree(html, root);
	}

	/**
	 * Inject the DOM tree into a target node
	 * @param   {HTMLElement} el - target element
	 * @param   {HTMLFragment|SVGElement} dom - dom tree to inject
	 * @returns {undefined}
	 */

	function injectDOM(el, dom) {
	  switch (true) {
	    case isSvg(el):
	      moveChildren(dom, el);
	      break;

	    case isTemplate(el):
	      el.parentNode.replaceChild(dom, el);
	      break;

	    default:
	      el.appendChild(dom);
	  }
	}

	/**
	 * Create the Template DOM skeleton
	 * @param   {HTMLElement} el - root node where the DOM will be injected
	 * @param   {string} html - markup that will be injected into the root node
	 * @returns {HTMLFragment} fragment that will be injected into the root node
	 */

	function createTemplateDOM(el, html) {
	  return html && (typeof html === 'string' ? createDOMTree(el, html) : html);
	}
	/**
	 * Template Chunk model
	 * @type {Object}
	 */


	const TemplateChunk = Object.freeze({
	  // Static props
	  // bindings: null,
	  // bindingsData: null,
	  // html: null,
	  // isTemplateTag: false,
	  // fragment: null,
	  // children: null,
	  // dom: null,
	  // el: null,

	  /**
	   * Create the template DOM structure that will be cloned on each mount
	   * @param   {HTMLElement} el - the root node
	   * @returns {TemplateChunk} self
	   */
	  createDOM(el) {
	    // make sure that the DOM gets created before cloning the template
	    this.dom = this.dom || createTemplateDOM(el, this.html);
	    return this;
	  },

	  // API methods

	  /**
	   * Attach the template to a DOM node
	   * @param   {HTMLElement} el - target DOM node
	   * @param   {*} scope - template data
	   * @param   {*} parentScope - scope of the parent template tag
	   * @param   {Object} meta - meta properties needed to handle the <template> tags in loops
	   * @returns {TemplateChunk} self
	   */
	  mount(el, scope, parentScope, meta) {
	    if (meta === void 0) {
	      meta = {};
	    }

	    if (!el) throw new Error('Please provide DOM node to mount properly your template');
	    if (this.el) this.unmount(scope); // <template> tags require a bit more work
	    // the template fragment might be already created via meta outside of this call

	    const {
	      fragment,
	      children,
	      avoidDOMInjection
	    } = meta; // <template> bindings of course can not have a root element
	    // so we check the parent node to set the query selector bindings

	    const {
	      parentNode
	    } = children ? children[0] : el;
	    const isTemplateTag = isTemplate(el);
	    const templateTagOffset = isTemplateTag ? Math.max(Array.from(parentNode.childNodes).indexOf(el), 0) : null;
	    this.isTemplateTag = isTemplateTag; // create the DOM if it wasn't created before

	    this.createDOM(el);

	    if (this.dom) {
	      // create the new template dom fragment if it want already passed in via meta
	      this.fragment = fragment || this.dom.cloneNode(true);
	    } // store root node
	    // notice that for template tags the root note will be the parent tag


	    this.el = this.isTemplateTag ? parentNode : el; // create the children array only for the <template> fragments

	    this.children = this.isTemplateTag ? children || Array.from(this.fragment.childNodes) : null; // inject the DOM into the el only if a fragment is available

	    if (!avoidDOMInjection && this.fragment) injectDOM(el, this.fragment); // create the bindings

	    this.bindings = this.bindingsData.map(binding => create$5(this.el, binding, templateTagOffset));
	    this.bindings.forEach(b => b.mount(scope, parentScope));
	    return this;
	  },

	  /**
	   * Update the template with fresh data
	   * @param   {*} scope - template data
	   * @param   {*} parentScope - scope of the parent template tag
	   * @returns {TemplateChunk} self
	   */
	  update(scope, parentScope) {
	    this.bindings.forEach(b => b.update(scope, parentScope));
	    return this;
	  },

	  /**
	   * Remove the template from the node where it was initially mounted
	   * @param   {*} scope - template data
	   * @param   {*} parentScope - scope of the parent template tag
	   * @param   {boolean|null} mustRemoveRoot - if true remove the root element,
	   * if false or undefined clean the root tag content, if null don't touch the DOM
	   * @returns {TemplateChunk} self
	   */
	  unmount(scope, parentScope, mustRemoveRoot) {
	    if (this.el) {
	      this.bindings.forEach(b => b.unmount(scope, parentScope, mustRemoveRoot));

	      switch (true) {
	        // <template> tags should be treated a bit differently
	        // we need to clear their children only if it's explicitly required by the caller
	        // via mustRemoveRoot !== null
	        case this.children && mustRemoveRoot !== null:
	          clearChildren(this.children);
	          break;
	        // remove the root node only if the mustRemoveRoot === true

	        case mustRemoveRoot === true:
	          removeNode(this.el);
	          break;
	        // otherwise we clean the node children

	        case mustRemoveRoot !== null:
	          cleanNode(this.el);
	          break;
	      }

	      this.el = null;
	    }

	    return this;
	  },

	  /**
	   * Clone the template chunk
	   * @returns {TemplateChunk} a clone of this object resetting the this.el property
	   */
	  clone() {
	    return Object.assign({}, this, {
	      el: null
	    });
	  }

	});
	/**
	 * Create a template chunk wiring also the bindings
	 * @param   {string|HTMLElement} html - template string
	 * @param   {Array} bindings - bindings collection
	 * @returns {TemplateChunk} a new TemplateChunk copy
	 */

	function create$6(html, bindings) {
	  if (bindings === void 0) {
	    bindings = [];
	  }

	  return Object.assign({}, TemplateChunk, {
	    html,
	    bindingsData: bindings
	  });
	}

	/**
	 * Method used to bind expressions to a DOM node
	 * @param   {string|HTMLElement} html - your static template html structure
	 * @param   {Array} bindings - list of the expressions to bind to update the markup
	 * @returns {TemplateChunk} a new TemplateChunk object having the `update`,`mount`, `unmount` and `clone` methods
	 *
	 * @example
	 *
	 * riotDOMBindings
	 *  .template(
	 *   `<div expr0><!----></div><div><p expr1><!----><section expr2></section></p>`,
	 *   [
	 *     {
	 *       selector: '[expr0]',
	 *       redundantAttribute: 'expr0',
	 *       expressions: [
	 *         {
	 *           type: expressionTypes.TEXT,
	 *           childNodeIndex: 0,
	 *           evaluate(scope) {
	 *             return scope.time;
	 *           },
	 *         },
	 *       ],
	 *     },
	 *     {
	 *       selector: '[expr1]',
	 *       redundantAttribute: 'expr1',
	 *       expressions: [
	 *         {
	 *           type: expressionTypes.TEXT,
	 *           childNodeIndex: 0,
	 *           evaluate(scope) {
	 *             return scope.name;
	 *           },
	 *         },
	 *         {
	 *           type: 'attribute',
	 *           name: 'style',
	 *           evaluate(scope) {
	 *             return scope.style;
	 *           },
	 *         },
	 *       ],
	 *     },
	 *     {
	 *       selector: '[expr2]',
	 *       redundantAttribute: 'expr2',
	 *       type: bindingTypes.IF,
	 *       evaluate(scope) {
	 *         return scope.isVisible;
	 *       },
	 *       template: riotDOMBindings.template('hello there'),
	 *     },
	 *   ]
	 * )
	 */

	var DOMBindings = /*#__PURE__*/Object.freeze({
	  __proto__: null,
	  template: create$6,
	  createBinding: create$5,
	  createExpression: create$2,
	  bindingTypes: bindingTypes,
	  expressionTypes: expressionTypes
	});

	function noop() {
	  return this;
	}
	/**
	 * Autobind the methods of a source object to itself
	 * @param   {Object} source - probably a riot tag instance
	 * @param   {Array<string>} methods - list of the methods to autobind
	 * @returns {Object} the original object received
	 */

	function autobindMethods(source, methods) {
	  methods.forEach(method => {
	    source[method] = source[method].bind(source);
	  });
	  return source;
	}
	/**
	 * Call the first argument received only if it's a function otherwise return it as it is
	 * @param   {*} source - anything
	 * @returns {*} anything
	 */

	function callOrAssign(source) {
	  return isFunction(source) ? source.prototype && source.prototype.constructor ? new source() : source() : source;
	}

	/**
	 * Helper function to set an immutable property
	 * @param   {Object} source - object where the new property will be set
	 * @param   {string} key - object key where the new property will be stored
	 * @param   {*} value - value of the new property
	 * @param   {Object} options - set the propery overriding the default options
	 * @returns {Object} - the original object modified
	 */
	function defineProperty(source, key, value, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  /* eslint-disable fp/no-mutating-methods */
	  Object.defineProperty(source, key, Object.assign({
	    value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options));
	  /* eslint-enable fp/no-mutating-methods */

	  return source;
	}
	/**
	 * Define multiple properties on a target object
	 * @param   {Object} source - object where the new properties will be set
	 * @param   {Object} properties - object containing as key pair the key + value properties
	 * @param   {Object} options - set the propery overriding the default options
	 * @returns {Object} the original object modified
	 */

	function defineProperties(source, properties, options) {
	  Object.entries(properties).forEach((_ref) => {
	    let [key, value] = _ref;
	    defineProperty(source, key, value, options);
	  });
	  return source;
	}
	/**
	 * Define default properties if they don't exist on the source object
	 * @param   {Object} source - object that will receive the default properties
	 * @param   {Object} defaults - object containing additional optional keys
	 * @returns {Object} the original object received enhanced
	 */

	function defineDefaults(source, defaults) {
	  Object.entries(defaults).forEach((_ref2) => {
	    let [key, value] = _ref2;
	    if (!source[key]) source[key] = value;
	  });
	  return source;
	}

	/**
	 * Converts any DOM node/s to a loopable array
	 * @param   { HTMLElement|NodeList } els - single html element or a node list
	 * @returns { Array } always a loopable object
	 */
	function domToArray(els) {
	  // can this object be already looped?
	  if (!Array.isArray(els)) {
	    // is it a node list?
	    if (/^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(els)) && typeof els.length === 'number') return Array.from(els);else // if it's a single node
	      // it will be returned as "array" with one single entry
	      return [els];
	  } // this object could be looped out of the box


	  return els;
	}

	/**
	 * Simple helper to find DOM nodes returning them as array like loopable object
	 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
	 * @param   { HTMLElement }        ctx      - context defining where the query will search for the DOM nodes
	 * @returns { Array } DOM nodes found as array
	 */

	function $(selector, ctx) {
	  return domToArray(typeof selector === 'string' ? (ctx || document).querySelectorAll(selector) : selector);
	}

	/**
	 * Normalize the return values, in case of a single value we avoid to return an array
	 * @param   { Array } values - list of values we want to return
	 * @returns { Array|string|boolean } either the whole list of values or the single one found
	 * @private
	 */

	const normalize = values => values.length === 1 ? values[0] : values;
	/**
	 * Parse all the nodes received to get/remove/check their attributes
	 * @param   { HTMLElement|NodeList|Array } els    - DOM node/s to parse
	 * @param   { string|Array }               name   - name or list of attributes
	 * @param   { string }                     method - method that will be used to parse the attributes
	 * @returns { Array|string } result of the parsing in a list or a single value
	 * @private
	 */


	function parseNodes(els, name, method) {
	  const names = typeof name === 'string' ? [name] : name;
	  return normalize(domToArray(els).map(el => {
	    return normalize(names.map(n => el[method](n)));
	  }));
	}
	/**
	 * Set any attribute on a single or a list of DOM nodes
	 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
	 * @param   { string|Object }              name  - either the name of the attribute to set
	 *                                                 or a list of properties as object key - value
	 * @param   { string }                     value - the new value of the attribute (optional)
	 * @returns { HTMLElement|NodeList|Array } the original array of elements passed to this function
	 *
	 * @example
	 *
	 * import { set } from 'bianco.attr'
	 *
	 * const img = document.createElement('img')
	 *
	 * set(img, 'width', 100)
	 *
	 * // or also
	 * set(img, {
	 *   width: 300,
	 *   height: 300
	 * })
	 *
	 */


	function set(els, name, value) {
	  const attrs = typeof name === 'object' ? name : {
	    [name]: value
	  };
	  const props = Object.keys(attrs);
	  domToArray(els).forEach(el => {
	    props.forEach(prop => el.setAttribute(prop, attrs[prop]));
	  });
	  return els;
	}
	/**
	 * Get any attribute from a single or a list of DOM nodes
	 * @param   { HTMLElement|NodeList|Array } els   - DOM node/s to parse
	 * @param   { string|Array }               name  - name or list of attributes to get
	 * @returns { Array|string } list of the attributes found
	 *
	 * @example
	 *
	 * import { get } from 'bianco.attr'
	 *
	 * const img = document.createElement('img')
	 *
	 * get(img, 'width') // => '200'
	 *
	 * // or also
	 * get(img, ['width', 'height']) // => ['200', '300']
	 *
	 * // or also
	 * get([img1, img2], ['width', 'height']) // => [['200', '300'], ['500', '200']]
	 */

	function get(els, name) {
	  return parseNodes(els, name, 'getAttribute');
	}

	const CSS_BY_NAME = new Map();
	const STYLE_NODE_SELECTOR = 'style[riot]'; // memoized curried function

	const getStyleNode = (style => {
	  return () => {
	    // lazy evaluation:
	    // if this function was already called before
	    // we return its cached result
	    if (style) return style; // create a new style element or use an existing one
	    // and cache it internally

	    style = $(STYLE_NODE_SELECTOR)[0] || document.createElement('style');
	    set(style, 'type', 'text/css');
	    /* istanbul ignore next */

	    if (!style.parentNode) document.head.appendChild(style);
	    return style;
	  };
	})();
	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */


	var cssManager = {
	  CSS_BY_NAME,

	  /**
	   * Save a tag style to be later injected into DOM
	   * @param { string } name - if it's passed we will map the css to a tagname
	   * @param { string } css - css string
	   * @returns {Object} self
	   */
	  add(name, css) {
	    if (!CSS_BY_NAME.has(name)) {
	      CSS_BY_NAME.set(name, css);
	      this.inject();
	    }

	    return this;
	  },

	  /**
	   * Inject all previously saved tag styles into DOM
	   * innerHTML seems slow: http://jsperf.com/riot-insert-style
	   * @returns {Object} self
	   */
	  inject() {
	    getStyleNode().innerHTML = [...CSS_BY_NAME.values()].join('\n');
	    return this;
	  },

	  /**
	   * Remove a tag style from the DOM
	   * @param {string} name a registered tagname
	   * @returns {Object} self
	   */
	  remove(name) {
	    if (CSS_BY_NAME.has(name)) {
	      CSS_BY_NAME.delete(name);
	      this.inject();
	    }

	    return this;
	  }

	};

	/**
	 * Function to curry any javascript method
	 * @param   {Function}  fn - the target function we want to curry
	 * @param   {...[args]} acc - initial arguments
	 * @returns {Function|*} it will return a function until the target function
	 *                       will receive all of its arguments
	 */
	function curry(fn) {
	  for (var _len = arguments.length, acc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    acc[_key - 1] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }

	    args = [...acc, ...args];
	    return args.length < fn.length ? curry(fn, ...args) : fn(...args);
	  };
	}

	/**
	 * Get the tag name of any DOM node
	 * @param   {HTMLElement} element - DOM node we want to inspect
	 * @returns {string} name to identify this dom node in riot
	 */

	function getName(element) {
	  return get(element, IS_DIRECTIVE) || element.tagName.toLowerCase();
	}

	const COMPONENT_CORE_HELPERS = Object.freeze({
	  // component helpers
	  $(selector) {
	    return $(selector, this.root)[0];
	  },

	  $$(selector) {
	    return $(selector, this.root);
	  }

	});
	const PURE_COMPONENT_API = Object.freeze({
	  [MOUNT_METHOD_KEY]: noop,
	  [UPDATE_METHOD_KEY]: noop,
	  [UNMOUNT_METHOD_KEY]: noop
	});
	const COMPONENT_LIFECYCLE_METHODS = Object.freeze({
	  [SHOULD_UPDATE_KEY]: noop,
	  [ON_BEFORE_MOUNT_KEY]: noop,
	  [ON_MOUNTED_KEY]: noop,
	  [ON_BEFORE_UPDATE_KEY]: noop,
	  [ON_UPDATED_KEY]: noop,
	  [ON_BEFORE_UNMOUNT_KEY]: noop,
	  [ON_UNMOUNTED_KEY]: noop
	});
	const MOCKED_TEMPLATE_INTERFACE = Object.assign({}, PURE_COMPONENT_API, {
	  clone: noop,
	  createDOM: noop
	});
	/**
	 * Evaluate the component properties either from its real attributes or from its initial user properties
	 * @param   {HTMLElement} element - component root
	 * @param   {Object}  initialProps - initial props
	 * @returns {Object} component props key value pairs
	 */

	function evaluateInitialProps(element, initialProps) {
	  if (initialProps === void 0) {
	    initialProps = {};
	  }

	  return Object.assign({}, DOMattributesToObject(element), callOrAssign(initialProps));
	}
	/**
	 * Bind a DOM node to its component object
	 * @param   {HTMLElement} node - html node mounted
	 * @param   {Object} component - Riot.js component object
	 * @returns {Object} the component object received as second argument
	 */


	const bindDOMNodeToComponentObject = (node, component) => node[DOM_COMPONENT_INSTANCE_PROPERTY] = component;
	/**
	 * Wrap the Riot.js core API methods using a mapping function
	 * @param   {Function} mapFunction - lifting function
	 * @returns {Object} an object having the { mount, update, unmount } functions
	 */


	function createCoreAPIMethods(mapFunction) {
	  return [MOUNT_METHOD_KEY, UPDATE_METHOD_KEY, UNMOUNT_METHOD_KEY].reduce((acc, method) => {
	    acc[method] = mapFunction(method);
	    return acc;
	  }, {});
	}
	/**
	 * Factory function to create the component templates only once
	 * @param   {Function} template - component template creation function
	 * @param   {Object} components - object containing the nested components
	 * @returns {TemplateChunk} template chunk object
	 */


	function componentTemplateFactory(template, components) {
	  return template(create$6, expressionTypes, bindingTypes, name => {
	    return components[name] || COMPONENTS_IMPLEMENTATION_MAP.get(name);
	  });
	}
	/**
	 * Create a pure component
	 * @param   {Function} pureFactoryFunction - pure component factory function
	 * @param   {Array} options.slots - component slots
	 * @param   {Array} options.attributes - component attributes
	 * @param   {Array} options.template - template factory function
	 * @param   {Array} options.template - template factory function
	 * @param   {any} options.props - initial component properties
	 * @returns {Object} pure component object
	 */


	function createPureComponent(pureFactoryFunction, _ref) {
	  let {
	    slots,
	    attributes,
	    props,
	    css,
	    template
	  } = _ref;
	  if (template) panic('Pure components can not have html');
	  if (css) panic('Pure components do not have css');
	  const component = defineDefaults(pureFactoryFunction({
	    slots,
	    attributes,
	    props
	  }), PURE_COMPONENT_API);
	  return createCoreAPIMethods(method => function () {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    // intercept the mount calls to bind the DOM node to the pure object created
	    // see also https://github.com/riot/riot/issues/2806
	    if (method === MOUNT_METHOD_KEY) {
	      const [el] = args;
	      bindDOMNodeToComponentObject(el, component);
	    }

	    component[method](...args);
	    return component;
	  });
	}
	/**
	 * Create the component interface needed for the @riotjs/dom-bindings tag bindings
	 * @param   {string} options.css - component css
	 * @param   {Function} options.template - functon that will return the dom-bindings template function
	 * @param   {Object} options.exports - component interface
	 * @param   {string} options.name - component name
	 * @returns {Object} component like interface
	 */


	function createComponent(_ref2) {
	  let {
	    css,
	    template,
	    exports,
	    name
	  } = _ref2;
	  const templateFn = template ? componentTemplateFactory(template, exports ? createSubcomponents(exports.components) : {}) : MOCKED_TEMPLATE_INTERFACE;
	  return (_ref3) => {
	    let {
	      slots,
	      attributes,
	      props
	    } = _ref3;
	    // pure components rendering will be managed by the end user
	    if (exports && exports[IS_PURE_SYMBOL]) return createPureComponent(exports, {
	      slots,
	      attributes,
	      props,
	      css,
	      template
	    });
	    const componentAPI = callOrAssign(exports) || {};
	    const component = defineComponent({
	      css,
	      template: templateFn,
	      componentAPI,
	      name
	    })({
	      slots,
	      attributes,
	      props
	    }); // notice that for the components create via tag binding
	    // we need to invert the mount (state/parentScope) arguments
	    // the template bindings will only forward the parentScope updates
	    // and never deal with the component state

	    return {
	      mount(element, parentScope, state) {
	        return component.mount(element, state, parentScope);
	      },

	      update(parentScope, state) {
	        return component.update(state, parentScope);
	      },

	      unmount(preserveRoot) {
	        return component.unmount(preserveRoot);
	      }

	    };
	  };
	}
	/**
	 * Component definition function
	 * @param   {Object} implementation - the componen implementation will be generated via compiler
	 * @param   {Object} component - the component initial properties
	 * @returns {Object} a new component implementation object
	 */

	function defineComponent(_ref4) {
	  let {
	    css,
	    template,
	    componentAPI,
	    name
	  } = _ref4;
	  // add the component css into the DOM
	  if (css && name) cssManager.add(name, css);
	  return curry(enhanceComponentAPI)(defineProperties( // set the component defaults without overriding the original component API
	  defineDefaults(componentAPI, Object.assign({}, COMPONENT_LIFECYCLE_METHODS, {
	    [STATE_KEY]: {}
	  })), Object.assign({
	    // defined during the component creation
	    [SLOTS_KEY]: null,
	    [ROOT_KEY]: null
	  }, COMPONENT_CORE_HELPERS, {
	    name,
	    css,
	    template
	  })));
	}
	/**
	 * Create the bindings to update the component attributes
	 * @param   {HTMLElement} node - node where we will bind the expressions
	 * @param   {Array} attributes - list of attribute bindings
	 * @returns {TemplateChunk} - template bindings object
	 */

	function createAttributeBindings(node, attributes) {
	  if (attributes === void 0) {
	    attributes = [];
	  }

	  const expressions = attributes.map(a => create$2(node, a));
	  const binding = {};
	  return Object.assign(binding, Object.assign({
	    expressions
	  }, createCoreAPIMethods(method => scope => {
	    expressions.forEach(e => e[method](scope));
	    return binding;
	  })));
	}
	/**
	 * Create the subcomponents that can be included inside a tag in runtime
	 * @param   {Object} components - components imported in runtime
	 * @returns {Object} all the components transformed into Riot.Component factory functions
	 */


	function createSubcomponents(components) {
	  if (components === void 0) {
	    components = {};
	  }

	  return Object.entries(callOrAssign(components)).reduce((acc, _ref5) => {
	    let [key, value] = _ref5;
	    acc[camelToDashCase(key)] = createComponent(value);
	    return acc;
	  }, {});
	}
	/**
	 * Run the component instance through all the plugins set by the user
	 * @param   {Object} component - component instance
	 * @returns {Object} the component enhanced by the plugins
	 */


	function runPlugins(component) {
	  return [...PLUGINS_SET].reduce((c, fn) => fn(c) || c, component);
	}
	/**
	 * Compute the component current state merging it with its previous state
	 * @param   {Object} oldState - previous state object
	 * @param   {Object} newState - new state givent to the `update` call
	 * @returns {Object} new object state
	 */


	function computeState(oldState, newState) {
	  return Object.assign({}, oldState, callOrAssign(newState));
	}
	/**
	 * Add eventually the "is" attribute to link this DOM node to its css
	 * @param {HTMLElement} element - target root node
	 * @param {string} name - name of the component mounted
	 * @returns {undefined} it's a void function
	 */


	function addCssHook(element, name) {
	  if (getName(element) !== name) {
	    set(element, IS_DIRECTIVE, name);
	  }
	}
	/**
	 * Component creation factory function that will enhance the user provided API
	 * @param   {Object} component - a component implementation previously defined
	 * @param   {Array} options.slots - component slots generated via riot compiler
	 * @param   {Array} options.attributes - attribute expressions generated via riot compiler
	 * @returns {Riot.Component} a riot component instance
	 */


	function enhanceComponentAPI(component, _ref6) {
	  let {
	    slots,
	    attributes,
	    props
	  } = _ref6;
	  return autobindMethods(runPlugins(defineProperties(Object.create(component), {
	    mount(element, state, parentScope) {
	      if (state === void 0) {
	        state = {};
	      }

	      this[ATTRIBUTES_KEY_SYMBOL] = createAttributeBindings(element, attributes).mount(parentScope);
	      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, evaluateInitialProps(element, props), evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions))));
	      this[STATE_KEY] = computeState(this[STATE_KEY], state);
	      this[TEMPLATE_KEY_SYMBOL] = this.template.createDOM(element).clone(); // link this object to the DOM node

	      bindDOMNodeToComponentObject(element, this); // add eventually the 'is' attribute

	      component.name && addCssHook(element, component.name); // define the root element

	      defineProperty(this, ROOT_KEY, element); // define the slots array

	      defineProperty(this, SLOTS_KEY, slots); // before mount lifecycle event

	      this[ON_BEFORE_MOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
	      this[PARENT_KEY_SYMBOL] = parentScope; // mount the template

	      this[TEMPLATE_KEY_SYMBOL].mount(element, this, parentScope);
	      this[ON_MOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
	      return this;
	    },

	    update(state, parentScope) {
	      if (state === void 0) {
	        state = {};
	      }

	      if (parentScope) {
	        this[PARENT_KEY_SYMBOL] = parentScope;
	        this[ATTRIBUTES_KEY_SYMBOL].update(parentScope);
	      }

	      const newProps = evaluateAttributeExpressions(this[ATTRIBUTES_KEY_SYMBOL].expressions);
	      if (this[SHOULD_UPDATE_KEY](newProps, this[PROPS_KEY]) === false) return;
	      defineProperty(this, PROPS_KEY, Object.freeze(Object.assign({}, this[PROPS_KEY], newProps)));
	      this[STATE_KEY] = computeState(this[STATE_KEY], state);
	      this[ON_BEFORE_UPDATE_KEY](this[PROPS_KEY], this[STATE_KEY]);
	      this[TEMPLATE_KEY_SYMBOL].update(this, this[PARENT_KEY_SYMBOL]);
	      this[ON_UPDATED_KEY](this[PROPS_KEY], this[STATE_KEY]);
	      return this;
	    },

	    unmount(preserveRoot) {
	      this[ON_BEFORE_UNMOUNT_KEY](this[PROPS_KEY], this[STATE_KEY]);
	      this[ATTRIBUTES_KEY_SYMBOL].unmount(); // if the preserveRoot is null the template html will be left untouched
	      // in that case the DOM cleanup will happen differently from a parent node

	      this[TEMPLATE_KEY_SYMBOL].unmount(this, this[PARENT_KEY_SYMBOL], preserveRoot === null ? null : !preserveRoot);
	      this[ON_UNMOUNTED_KEY](this[PROPS_KEY], this[STATE_KEY]);
	      return this;
	    }

	  })), Object.keys(component).filter(prop => isFunction(component[prop])));
	}
	/**
	 * Component initialization function starting from a DOM node
	 * @param   {HTMLElement} element - element to upgrade
	 * @param   {Object} initialProps - initial component properties
	 * @param   {string} componentName - component id
	 * @returns {Object} a new component instance bound to a DOM node
	 */

	function mountComponent(element, initialProps, componentName) {
	  const name = componentName || getName(element);
	  if (!COMPONENTS_IMPLEMENTATION_MAP.has(name)) panic(`The component named "${name}" was never registered`);
	  const component = COMPONENTS_IMPLEMENTATION_MAP.get(name)({
	    props: initialProps
	  });
	  return component.mount(element);
	}

	/**
	 * Similar to compose but performs from left-to-right function composition.<br/>
	 * {@link https://30secondsofcode.org/function#composeright see also}
	 * @param   {...[function]} fns) - list of unary function
	 * @returns {*} result of the computation
	 */
	/**
	 * Performs right-to-left function composition.<br/>
	 * Use Array.prototype.reduce() to perform right-to-left function composition.<br/>
	 * The last (rightmost) function can accept one or more arguments; the remaining functions must be unary.<br/>
	 * {@link https://30secondsofcode.org/function#compose original source code}
	 * @param   {...[function]} fns) - list of unary function
	 * @returns {*} result of the computation
	 */

	function compose() {
	  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    fns[_key2] = arguments[_key2];
	  }

	  return fns.reduce((f, g) => function () {
	    return f(g(...arguments));
	  });
	}

	const {
	  DOM_COMPONENT_INSTANCE_PROPERTY: DOM_COMPONENT_INSTANCE_PROPERTY$1,
	  COMPONENTS_IMPLEMENTATION_MAP: COMPONENTS_IMPLEMENTATION_MAP$1,
	  PLUGINS_SET: PLUGINS_SET$1
	} = globals;
	/**
	 * Riot public api
	 */

	/**
	 * Register a custom tag by name
	 * @param   {string} name - component name
	 * @param   {Object} implementation - tag implementation
	 * @returns {Map} map containing all the components implementations
	 */

	function register(name, _ref) {
	  let {
	    css,
	    template,
	    exports
	  } = _ref;
	  if (COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component "${name}" was already registered`);
	  COMPONENTS_IMPLEMENTATION_MAP$1.set(name, createComponent({
	    name,
	    css,
	    template,
	    exports
	  }));
	  return COMPONENTS_IMPLEMENTATION_MAP$1;
	}
	/**
	 * Unregister a riot web component
	 * @param   {string} name - component name
	 * @returns {Map} map containing all the components implementations
	 */

	function unregister(name) {
	  if (!COMPONENTS_IMPLEMENTATION_MAP$1.has(name)) panic(`The component "${name}" was never registered`);
	  COMPONENTS_IMPLEMENTATION_MAP$1.delete(name);
	  cssManager.remove(name);
	  return COMPONENTS_IMPLEMENTATION_MAP$1;
	}
	/**
	 * Mounting function that will work only for the components that were globally registered
	 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
	 * @param   {Object} initialProps - the initial component properties
	 * @param   {string} name - optional component name
	 * @returns {Array} list of nodes upgraded
	 */

	function mount(selector, initialProps, name) {
	  return $(selector).map(element => mountComponent(element, initialProps, name));
	}
	/**
	 * Sweet unmounting helper function for the DOM node mounted manually by the user
	 * @param   {string|HTMLElement} selector - query for the selection or a DOM element
	 * @param   {boolean|null} keepRootElement - if true keep the root element
	 * @returns {Array} list of nodes unmounted
	 */

	function unmount(selector, keepRootElement) {
	  return $(selector).map(element => {
	    if (element[DOM_COMPONENT_INSTANCE_PROPERTY$1]) {
	      element[DOM_COMPONENT_INSTANCE_PROPERTY$1].unmount(keepRootElement);
	    }

	    return element;
	  });
	}
	/**
	 * Define a riot plugin
	 * @param   {Function} plugin - function that will receive all the components created
	 * @returns {Set} the set containing all the plugins installed
	 */

	function install(plugin) {
	  if (!isFunction(plugin)) panic('Plugins must be of type function');
	  if (PLUGINS_SET$1.has(plugin)) panic('This plugin was already installed');
	  PLUGINS_SET$1.add(plugin);
	  return PLUGINS_SET$1;
	}
	/**
	 * Uninstall a riot plugin
	 * @param   {Function} plugin - plugin previously installed
	 * @returns {Set} the set containing all the plugins installed
	 */

	function uninstall(plugin) {
	  if (!PLUGINS_SET$1.has(plugin)) panic('This plugin was never installed');
	  PLUGINS_SET$1.delete(plugin);
	  return PLUGINS_SET$1;
	}
	/**
	 * Helper method to create component without relying on the registered ones
	 * @param   {Object} implementation - component implementation
	 * @returns {Function} function that will allow you to mount a riot component on a DOM node
	 */

	function component(implementation) {
	  return function (el, props, _temp) {
	    let {
	      slots,
	      attributes,
	      parentScope
	    } = _temp === void 0 ? {} : _temp;
	    return compose(c => c.mount(el, parentScope), c => c({
	      props,
	      slots,
	      attributes
	    }), createComponent)(implementation);
	  };
	}
	/**
	 * Lift a riot component Interface into a pure riot object
	 * @param   {Function} func - RiotPureComponent factory function
	 * @returns {Function} the lifted original function received as argument
	 */

	function pure(func) {
	  if (!isFunction(func)) panic('riot.pure accepts only arguments of type "function"');
	  func[IS_PURE_SYMBOL] = true;
	  return func;
	}
	/** @type {string} current riot version */

	const version = 'v4.13.4'; // expose some internal stuff that might be used from external tools

	const __ = {
	  cssManager,
	  DOMBindings,
	  createComponent,
	  defineComponent,
	  globals
	};

	var riot_esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		__: __,
		component: component,
		install: install,
		mount: mount,
		pure: pure,
		register: register,
		uninstall: uninstall,
		unmount: unmount,
		unregister: unregister,
		version: version
	});

	/**
	 * Converts any DOM node/s to a loopable array
	 * @param   { HTMLElement|NodeList } els - single html element or a node list
	 * @returns { Array } always a loopable object
	 */
	function domToArray$1(els) {
	  // can this object be already looped?
	  if (!Array.isArray(els)) {
	    // is it a node list?
	    if (
	      /^\[object (HTMLCollection|NodeList|Object)\]$/
	        .test(Object.prototype.toString.call(els))
	        && typeof els.length === 'number'
	    )
	      return Array.from(els)
	    else
	      // if it's a single node
	      // it will be returned as "array" with one single entry
	      return [els]
	  }
	  // this object could be looped out of the box
	  return els
	}

	/**
	 * Simple helper to find DOM nodes returning them as array like loopable object
	 * @param   { string|DOMNodeList } selector - either the query or the DOM nodes to arraify
	 * @param   { HTMLElement }        ctx      - context defining where the query will search for the DOM nodes
	 * @returns { Array } DOM nodes found as array
	 */
	function $$1(selector, ctx) {
	  return domToArray$1(typeof selector === 'string' ?
	    (ctx || document).querySelectorAll(selector) :
	    selector
	  )
	}

	var hotReload = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	   factory(exports, riot_esm, $$1) ;
	}(commonjsGlobal, (function (exports, riot, $) {
	  $ = $ && Object.prototype.hasOwnProperty.call($, 'default') ? $['default'] : $;

	  const { cssManager } = riot.__;
	  const { DOM_COMPONENT_INSTANCE_PROPERTY } = riot.__.globals;

	  function reload(componentAPI) {
	    const {name} = componentAPI;

	    if (!name) {
	      console.warn('Anonymous components can not be reloaded'); // eslint-disable-line
	      return []
	    }

	    return $(`${name}, [is=${name}]`).map(el => {
	      const oldTag = el[DOM_COMPONENT_INSTANCE_PROPERTY];

	      // early return in case there is no riot instance found
	      if (!oldTag) return

	      // remove the tag template from the DOM
	      oldTag.unmount(true);
	      // delete the old css from the css manager
	      cssManager.remove(name);

	      // create the new tag
	      const newTag = riot.component(componentAPI)(el, oldTag.props);
	      newTag.update(oldTag.state);

	      return newTag
	    })
	  }

	  exports.default = reload;
	  exports.reload = reload;

	  Object.defineProperty(exports, '__esModule', { value: true });

	})));
	});

	var Barcode_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Barcode = function Barcode(data, options) {
		_classCallCheck(this, Barcode);

		this.data = data;
		this.text = options.text || data;
		this.options = options;
	};

	exports.default = Barcode;
	});

	var CODE39_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CODE39 = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/Code_39#Encoding

	var CODE39 = function (_Barcode) {
		_inherits(CODE39, _Barcode);

		function CODE39(data, options) {
			_classCallCheck(this, CODE39);

			data = data.toUpperCase();

			// Calculate mod43 checksum if enabled
			if (options.mod43) {
				data += getCharacter(mod43checksum(data));
			}

			return _possibleConstructorReturn(this, (CODE39.__proto__ || Object.getPrototypeOf(CODE39)).call(this, data, options));
		}

		_createClass(CODE39, [{
			key: "encode",
			value: function encode() {
				// First character is always a *
				var result = getEncoding("*");

				// Take every character and add the binary representation to the result
				for (var i = 0; i < this.data.length; i++) {
					result += getEncoding(this.data[i]) + "0";
				}

				// Last character is always a *
				result += getEncoding("*");

				return {
					data: result,
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function valid() {
				return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
			}
		}]);

		return CODE39;
	}(_Barcode3.default);

	// All characters. The position in the array is the (checksum) value


	var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

	// The decimal representation of the characters, is converted to the
	// corresponding binary with the getEncoding function
	var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

	// Get the binary representation of a character by converting the encodings
	// from decimal to binary
	function getEncoding(character) {
		return getBinary(characterValue(character));
	}

	function getBinary(characterValue) {
		return encodings[characterValue].toString(2);
	}

	function getCharacter(characterValue) {
		return characters[characterValue];
	}

	function characterValue(character) {
		return characters.indexOf(character);
	}

	function mod43checksum(data) {
		var checksum = 0;
		for (var i = 0; i < data.length; i++) {
			checksum += characterValue(data[i]);
		}

		checksum = checksum % 43;
		return checksum;
	}

	exports.CODE39 = CODE39;
	});

	var constants = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _SET_BY_CODE;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// constants for internal usage
	var SET_A = exports.SET_A = 0;
	var SET_B = exports.SET_B = 1;
	var SET_C = exports.SET_C = 2;

	// Special characters
	var SHIFT = exports.SHIFT = 98;
	var START_A = exports.START_A = 103;
	var START_B = exports.START_B = 104;
	var START_C = exports.START_C = 105;
	var MODULO = exports.MODULO = 103;
	var STOP = exports.STOP = 106;
	var FNC1 = exports.FNC1 = 207;

	// Get set by start code
	var SET_BY_CODE = exports.SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE);

	// Get next set by code
	var SWAP = exports.SWAP = {
		101: SET_A,
		100: SET_B,
		99: SET_C
	};

	var A_START_CHAR = exports.A_START_CHAR = String.fromCharCode(208); // START_A + 105
	var B_START_CHAR = exports.B_START_CHAR = String.fromCharCode(209); // START_B + 105
	var C_START_CHAR = exports.C_START_CHAR = String.fromCharCode(210); // START_C + 105

	// 128A (Code Set A)
	// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
	var A_CHARS = exports.A_CHARS = "[\x00-\x5F\xC8-\xCF]";

	// 128B (Code Set B)
	// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
	var B_CHARS = exports.B_CHARS = "[\x20-\x7F\xC8-\xCF]";

	// 128C (Code Set C)
	// 00–99 (encodes two digits with a single code point) and FNC1
	var C_CHARS = exports.C_CHARS = "(\xCF*[0-9]{2}\xCF*)";

	// CODE128 includes 107 symbols:
	// 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
	// Each symbol consist of three black bars (1) and three white spaces (0).
	var BARS = exports.BARS = [11011001100, 11001101100, 11001100110, 10010011000, 10010001100, 10001001100, 10011001000, 10011000100, 10001100100, 11001001000, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011000, 11011000110, 11000110110, 10100011000, 10001011000, 10001000110, 10110001000, 10001101000, 10001100010, 11010001000, 11000101000, 11000100010, 10110111000, 10110001110, 10001101110, 10111011000, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101000, 11011100010, 11011101110, 11101011000, 11101000110, 11100010110, 11101101000, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 10100110000, 10100001100, 10010110000, 10010000110, 10000101100, 10000100110, 10110010000, 10110000100, 10011010000, 10011000010, 10000110100, 10000110010, 11000010010, 11001010000, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111000, 10100011110, 10001011110, 10111101000, 10111100010, 11110101000, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 11010010000, 11010011100, 1100011101011];
	});

	var CODE128_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _Barcode3 = _interopRequireDefault(Barcode_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// This is the master class,
	// it does require the start code to be included in the string
	var CODE128 = function (_Barcode) {
		_inherits(CODE128, _Barcode);

		function CODE128(data, options) {
			_classCallCheck(this, CODE128);

			// Get array of ascii codes from data
			var _this = _possibleConstructorReturn(this, (CODE128.__proto__ || Object.getPrototypeOf(CODE128)).call(this, data.substring(1), options));

			_this.bytes = data.split('').map(function (char) {
				return char.charCodeAt(0);
			});
			return _this;
		}

		_createClass(CODE128, [{
			key: 'valid',
			value: function valid() {
				// ASCII value ranges 0-127, 200-211
				return (/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)
				);
			}

			// The public encoding function

		}, {
			key: 'encode',
			value: function encode() {
				var bytes = this.bytes;
				// Remove the start code from the bytes and set its index
				var startIndex = bytes.shift() - 105;
				// Get start set by index
				var startSet = constants.SET_BY_CODE[startIndex];

				if (startSet === undefined) {
					throw new RangeError('The encoding does not start with a start character.');
				}

				if (this.shouldEncodeAsEan128() === true) {
					bytes.unshift(constants.FNC1);
				}

				// Start encode with the right type
				var encodingResult = CODE128.next(bytes, 1, startSet);

				return {
					text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, '') : this.text,
					data:
					// Add the start bits
					CODE128.getBar(startIndex) +
					// Add the encoded bits
					encodingResult.result +
					// Add the checksum
					CODE128.getBar((encodingResult.checksum + startIndex) % constants.MODULO) +
					// Add the end bits
					CODE128.getBar(constants.STOP)
				};
			}

			// GS1-128/EAN-128

		}, {
			key: 'shouldEncodeAsEan128',
			value: function shouldEncodeAsEan128() {
				var isEAN128 = this.options.ean128 || false;
				if (typeof isEAN128 === 'string') {
					isEAN128 = isEAN128.toLowerCase() === 'true';
				}
				return isEAN128;
			}

			// Get a bar symbol by index

		}], [{
			key: 'getBar',
			value: function getBar(index) {
				return constants.BARS[index] ? constants.BARS[index].toString() : '';
			}

			// Correct an index by a set and shift it from the bytes array

		}, {
			key: 'correctIndex',
			value: function correctIndex(bytes, set) {
				if (set === constants.SET_A) {
					var charCode = bytes.shift();
					return charCode < 32 ? charCode + 64 : charCode - 32;
				} else if (set === constants.SET_B) {
					return bytes.shift() - 32;
				} else {
					return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
				}
			}
		}, {
			key: 'next',
			value: function next(bytes, pos, set) {
				if (!bytes.length) {
					return { result: '', checksum: 0 };
				}

				var nextCode = void 0,
				    index = void 0;

				// Special characters
				if (bytes[0] >= 200) {
					index = bytes.shift() - 105;
					var nextSet = constants.SWAP[index];

					// Swap to other set
					if (nextSet !== undefined) {
						nextCode = CODE128.next(bytes, pos + 1, nextSet);
					}
					// Continue on current set but encode a special character
					else {
							// Shift
							if ((set === constants.SET_A || set === constants.SET_B) && index === constants.SHIFT) {
								// Convert the next character so that is encoded correctly
								bytes[0] = set === constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
							}
							nextCode = CODE128.next(bytes, pos + 1, set);
						}
				}
				// Continue encoding
				else {
						index = CODE128.correctIndex(bytes, set);
						nextCode = CODE128.next(bytes, pos + 1, set);
					}

				// Get the correct binary encoding and calculate the weight
				var enc = CODE128.getBar(index);
				var weight = index * pos;

				return {
					result: enc + nextCode.result,
					checksum: weight + nextCode.checksum
				};
			}
		}]);

		return CODE128;
	}(_Barcode3.default);

	exports.default = CODE128;
	});

	var auto = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	// Match Set functions
	var matchSetALength = function matchSetALength(string) {
		return string.match(new RegExp('^' + constants.A_CHARS + '*'))[0].length;
	};
	var matchSetBLength = function matchSetBLength(string) {
		return string.match(new RegExp('^' + constants.B_CHARS + '*'))[0].length;
	};
	var matchSetC = function matchSetC(string) {
		return string.match(new RegExp('^' + constants.C_CHARS + '*'))[0];
	};

	// CODE128A or CODE128B
	function autoSelectFromAB(string, isA) {
		var ranges = isA ? constants.A_CHARS : constants.B_CHARS;
		var untilC = string.match(new RegExp('^(' + ranges + '+?)(([0-9]{2}){2,})([^0-9]|$)'));

		if (untilC) {
			return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
		}

		var chars = string.match(new RegExp('^' + ranges + '+'))[0];

		if (chars.length === string.length) {
			return string;
		}

		return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
	}

	// CODE128C
	function autoSelectFromC(string) {
		var cMatch = matchSetC(string);
		var length = cMatch.length;

		if (length === string.length) {
			return string;
		}

		string = string.substring(length);

		// Select A/B depending on the longest match
		var isA = matchSetALength(string) >= matchSetBLength(string);
		return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
	}

	// Detect Code Set (A, B or C) and format the string

	exports.default = function (string) {
		var newString = void 0;
		var cLength = matchSetC(string).length;

		// Select 128C if the string start with enough digits
		if (cLength >= 2) {
			newString = constants.C_START_CHAR + autoSelectFromC(string);
		} else {
			// Select A/B depending on the longest match
			var isA = matchSetALength(string) > matchSetBLength(string);
			newString = (isA ? constants.A_START_CHAR : constants.B_START_CHAR) + autoSelectFromAB(string, isA);
		}

		return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
		function (match, char) {
			return String.fromCharCode(203) + char;
		});
	};
	});

	var CODE128_AUTO = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var _CODE3 = _interopRequireDefault(CODE128_1);



	var _auto2 = _interopRequireDefault(auto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128AUTO = function (_CODE) {
		_inherits(CODE128AUTO, _CODE);

		function CODE128AUTO(data, options) {
			_classCallCheck(this, CODE128AUTO);

			// ASCII value ranges 0-127, 200-211
			if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
				var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, (0, _auto2.default)(data), options));
			} else {
				var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, data, options));
			}
			return _possibleConstructorReturn(_this);
		}

		return CODE128AUTO;
	}(_CODE3.default);

	exports.default = CODE128AUTO;
	});

	var CODE128A_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _CODE3 = _interopRequireDefault(CODE128_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128A = function (_CODE) {
		_inherits(CODE128A, _CODE);

		function CODE128A(string, options) {
			_classCallCheck(this, CODE128A);

			return _possibleConstructorReturn(this, (CODE128A.__proto__ || Object.getPrototypeOf(CODE128A)).call(this, constants.A_START_CHAR + string, options));
		}

		_createClass(CODE128A, [{
			key: 'valid',
			value: function valid() {
				return new RegExp('^' + constants.A_CHARS + '+$').test(this.data);
			}
		}]);

		return CODE128A;
	}(_CODE3.default);

	exports.default = CODE128A;
	});

	var CODE128B_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _CODE3 = _interopRequireDefault(CODE128_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128B = function (_CODE) {
		_inherits(CODE128B, _CODE);

		function CODE128B(string, options) {
			_classCallCheck(this, CODE128B);

			return _possibleConstructorReturn(this, (CODE128B.__proto__ || Object.getPrototypeOf(CODE128B)).call(this, constants.B_START_CHAR + string, options));
		}

		_createClass(CODE128B, [{
			key: 'valid',
			value: function valid() {
				return new RegExp('^' + constants.B_CHARS + '+$').test(this.data);
			}
		}]);

		return CODE128B;
	}(_CODE3.default);

	exports.default = CODE128B;
	});

	var CODE128C_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _CODE3 = _interopRequireDefault(CODE128_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CODE128C = function (_CODE) {
		_inherits(CODE128C, _CODE);

		function CODE128C(string, options) {
			_classCallCheck(this, CODE128C);

			return _possibleConstructorReturn(this, (CODE128C.__proto__ || Object.getPrototypeOf(CODE128C)).call(this, constants.C_START_CHAR + string, options));
		}

		_createClass(CODE128C, [{
			key: 'valid',
			value: function valid() {
				return new RegExp('^' + constants.C_CHARS + '+$').test(this.data);
			}
		}]);

		return CODE128C;
	}(_CODE3.default);

	exports.default = CODE128C;
	});

	var CODE128 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;



	var _CODE128_AUTO2 = _interopRequireDefault(CODE128_AUTO);



	var _CODE128A2 = _interopRequireDefault(CODE128A_1);



	var _CODE128B2 = _interopRequireDefault(CODE128B_1);



	var _CODE128C2 = _interopRequireDefault(CODE128C_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.CODE128 = _CODE128_AUTO2.default;
	exports.CODE128A = _CODE128A2.default;
	exports.CODE128B = _CODE128B2.default;
	exports.CODE128C = _CODE128C2.default;
	});

	var constants$1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// Standard start end and middle bits
	var SIDE_BIN = exports.SIDE_BIN = '101';
	var MIDDLE_BIN = exports.MIDDLE_BIN = '01010';

	var BINARIES = exports.BINARIES = {
		'L': [// The L (left) type of encoding
		'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
		'G': [// The G type of encoding
		'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
		'R': [// The R (right) type of encoding
		'1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
		'O': [// The O (odd) encoding for UPC-E
		'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
		'E': [// The E (even) encoding for UPC-E
		'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
	};

	// Define the EAN-2 structure
	var EAN2_STRUCTURE = exports.EAN2_STRUCTURE = ['LL', 'LG', 'GL', 'GG'];

	// Define the EAN-5 structure
	var EAN5_STRUCTURE = exports.EAN5_STRUCTURE = ['GGLLL', 'GLGLL', 'GLLGL', 'GLLLG', 'LGGLL', 'LLGGL', 'LLLGG', 'LGLGL', 'LGLLG', 'LLGLG'];

	// Define the EAN-13 structure
	var EAN13_STRUCTURE = exports.EAN13_STRUCTURE = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];
	});

	var encoder = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	// Encode data string
	var encode = function encode(data, structure, separator) {
		var encoded = data.split('').map(function (val, idx) {
			return constants$1.BINARIES[structure[idx]];
		}).map(function (val, idx) {
			return val ? val[data[idx]] : '';
		});

		if (separator) {
			var last = data.length - 1;
			encoded = encoded.map(function (val, idx) {
				return idx < last ? val + separator : val;
			});
		}

		return encoded.join('');
	};

	exports.default = encode;
	});

	var EAN_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





	var _encoder2 = _interopRequireDefault(encoder);



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Base class for EAN8 & EAN13
	var EAN = function (_Barcode) {
		_inherits(EAN, _Barcode);

		function EAN(data, options) {
			_classCallCheck(this, EAN);

			// Make sure the font is not bigger than the space between the guard bars
			var _this = _possibleConstructorReturn(this, (EAN.__proto__ || Object.getPrototypeOf(EAN)).call(this, data, options));

			_this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

			// Make the guard bars go down half the way of the text
			_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
			return _this;
		}

		_createClass(EAN, [{
			key: 'encode',
			value: function encode() {
				return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
			}
		}, {
			key: 'leftText',
			value: function leftText(from, to) {
				return this.text.substr(from, to);
			}
		}, {
			key: 'leftEncode',
			value: function leftEncode(data, structure) {
				return (0, _encoder2.default)(data, structure);
			}
		}, {
			key: 'rightText',
			value: function rightText(from, to) {
				return this.text.substr(from, to);
			}
		}, {
			key: 'rightEncode',
			value: function rightEncode(data, structure) {
				return (0, _encoder2.default)(data, structure);
			}
		}, {
			key: 'encodeGuarded',
			value: function encodeGuarded() {
				var textOptions = { fontSize: this.fontSize };
				var guardOptions = { height: this.guardHeight };

				return [{ data: constants$1.SIDE_BIN, options: guardOptions }, { data: this.leftEncode(), text: this.leftText(), options: textOptions }, { data: constants$1.MIDDLE_BIN, options: guardOptions }, { data: this.rightEncode(), text: this.rightText(), options: textOptions }, { data: constants$1.SIDE_BIN, options: guardOptions }];
			}
		}, {
			key: 'encodeFlat',
			value: function encodeFlat() {
				var data = [constants$1.SIDE_BIN, this.leftEncode(), constants$1.MIDDLE_BIN, this.rightEncode(), constants$1.SIDE_BIN];

				return {
					data: data.join(''),
					text: this.text
				};
			}
		}]);

		return EAN;
	}(_Barcode3.default);

	exports.default = EAN;
	});

	var EAN13_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };





	var _EAN3 = _interopRequireDefault(EAN_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

	// Calculate the checksum digit
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
	var checksum = function checksum(number) {
		var res = number.substr(0, 12).split('').map(function (n) {
			return +n;
		}).reduce(function (sum, a, idx) {
			return idx % 2 ? sum + a * 3 : sum + a;
		}, 0);

		return (10 - res % 10) % 10;
	};

	var EAN13 = function (_EAN) {
		_inherits(EAN13, _EAN);

		function EAN13(data, options) {
			_classCallCheck(this, EAN13);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{12}$/) !== -1) {
				data += checksum(data);
			}

			// Adds a last character to the end of the barcode
			var _this = _possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

			_this.lastChar = options.lastChar;
			return _this;
		}

		_createClass(EAN13, [{
			key: 'valid',
			value: function valid() {
				return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
			}
		}, {
			key: 'leftText',
			value: function leftText() {
				return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftText', this).call(this, 1, 6);
			}
		}, {
			key: 'leftEncode',
			value: function leftEncode() {
				var data = this.data.substr(1, 6);
				var structure = constants$1.EAN13_STRUCTURE[this.data[0]];
				return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftEncode', this).call(this, data, structure);
			}
		}, {
			key: 'rightText',
			value: function rightText() {
				return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightText', this).call(this, 7, 6);
			}
		}, {
			key: 'rightEncode',
			value: function rightEncode() {
				var data = this.data.substr(7, 6);
				return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightEncode', this).call(this, data, 'RRRRRR');
			}

			// The "standard" way of printing EAN13 barcodes with guard bars

		}, {
			key: 'encodeGuarded',
			value: function encodeGuarded() {
				var data = _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'encodeGuarded', this).call(this);

				// Extend data with left digit & last character
				if (this.options.displayValue) {
					data.unshift({
						data: '000000000000',
						text: this.text.substr(0, 1),
						options: { textAlign: 'left', fontSize: this.fontSize }
					});

					if (this.options.lastChar) {
						data.push({
							data: '00'
						});
						data.push({
							data: '00000',
							text: this.options.lastChar,
							options: { fontSize: this.fontSize }
						});
					}
				}

				return data;
			}
		}]);

		return EAN13;
	}(_EAN3.default);

	exports.default = EAN13;
	});

	var EAN8_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };



	var _EAN3 = _interopRequireDefault(EAN_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// http://www.barcodeisland.com/ean8.phtml

	// Calculate the checksum digit
	var checksum = function checksum(number) {
		var res = number.substr(0, 7).split('').map(function (n) {
			return +n;
		}).reduce(function (sum, a, idx) {
			return idx % 2 ? sum + a : sum + a * 3;
		}, 0);

		return (10 - res % 10) % 10;
	};

	var EAN8 = function (_EAN) {
		_inherits(EAN8, _EAN);

		function EAN8(data, options) {
			_classCallCheck(this, EAN8);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{7}$/) !== -1) {
				data += checksum(data);
			}

			return _possibleConstructorReturn(this, (EAN8.__proto__ || Object.getPrototypeOf(EAN8)).call(this, data, options));
		}

		_createClass(EAN8, [{
			key: 'valid',
			value: function valid() {
				return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
			}
		}, {
			key: 'leftText',
			value: function leftText() {
				return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftText', this).call(this, 0, 4);
			}
		}, {
			key: 'leftEncode',
			value: function leftEncode() {
				var data = this.data.substr(0, 4);
				return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftEncode', this).call(this, data, 'LLLL');
			}
		}, {
			key: 'rightText',
			value: function rightText() {
				return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightText', this).call(this, 4, 4);
			}
		}, {
			key: 'rightEncode',
			value: function rightEncode() {
				var data = this.data.substr(4, 4);
				return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightEncode', this).call(this, data, 'RRRR');
			}
		}]);

		return EAN8;
	}(_EAN3.default);

	exports.default = EAN8;
	});

	var EAN5_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





	var _encoder2 = _interopRequireDefault(encoder);



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_5#Encoding

	var checksum = function checksum(data) {
		var result = data.split('').map(function (n) {
			return +n;
		}).reduce(function (sum, a, idx) {
			return idx % 2 ? sum + a * 9 : sum + a * 3;
		}, 0);
		return result % 10;
	};

	var EAN5 = function (_Barcode) {
		_inherits(EAN5, _Barcode);

		function EAN5(data, options) {
			_classCallCheck(this, EAN5);

			return _possibleConstructorReturn(this, (EAN5.__proto__ || Object.getPrototypeOf(EAN5)).call(this, data, options));
		}

		_createClass(EAN5, [{
			key: 'valid',
			value: function valid() {
				return this.data.search(/^[0-9]{5}$/) !== -1;
			}
		}, {
			key: 'encode',
			value: function encode() {
				var structure = constants$1.EAN5_STRUCTURE[checksum(this.data)];
				return {
					data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
					text: this.text
				};
			}
		}]);

		return EAN5;
	}(_Barcode3.default);

	exports.default = EAN5;
	});

	var EAN2_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





	var _encoder2 = _interopRequireDefault(encoder);



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/EAN_2#Encoding

	var EAN2 = function (_Barcode) {
		_inherits(EAN2, _Barcode);

		function EAN2(data, options) {
			_classCallCheck(this, EAN2);

			return _possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));
		}

		_createClass(EAN2, [{
			key: 'valid',
			value: function valid() {
				return this.data.search(/^[0-9]{2}$/) !== -1;
			}
		}, {
			key: 'encode',
			value: function encode() {
				// Choose the structure based on the number mod 4
				var structure = constants$1.EAN2_STRUCTURE[parseInt(this.data) % 4];
				return {
					// Start bits + Encode the two digits with 01 in between
					data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
					text: this.text
				};
			}
		}]);

		return EAN2;
	}(_Barcode3.default);

	exports.default = EAN2;
	});

	var UPC_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.checksum = checksum;



	var _encoder2 = _interopRequireDefault(encoder);



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

	var UPC = function (_Barcode) {
		_inherits(UPC, _Barcode);

		function UPC(data, options) {
			_classCallCheck(this, UPC);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{11}$/) !== -1) {
				data += checksum(data);
			}

			var _this = _possibleConstructorReturn(this, (UPC.__proto__ || Object.getPrototypeOf(UPC)).call(this, data, options));

			_this.displayValue = options.displayValue;

			// Make sure the font is not bigger than the space between the guard bars
			if (options.fontSize > options.width * 10) {
				_this.fontSize = options.width * 10;
			} else {
				_this.fontSize = options.fontSize;
			}

			// Make the guard bars go down half the way of the text
			_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
			return _this;
		}

		_createClass(UPC, [{
			key: "valid",
			value: function valid() {
				return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
			}
		}, {
			key: "encode",
			value: function encode() {
				if (this.options.flat) {
					return this.flatEncoding();
				} else {
					return this.guardedEncoding();
				}
			}
		}, {
			key: "flatEncoding",
			value: function flatEncoding() {
				var result = "";

				result += "101";
				result += (0, _encoder2.default)(this.data.substr(0, 6), "LLLLLL");
				result += "01010";
				result += (0, _encoder2.default)(this.data.substr(6, 6), "RRRRRR");
				result += "101";

				return {
					data: result,
					text: this.text
				};
			}
		}, {
			key: "guardedEncoding",
			value: function guardedEncoding() {
				var result = [];

				// Add the first digit
				if (this.displayValue) {
					result.push({
						data: "00000000",
						text: this.text.substr(0, 1),
						options: { textAlign: "left", fontSize: this.fontSize }
					});
				}

				// Add the guard bars
				result.push({
					data: "101" + (0, _encoder2.default)(this.data[0], "L"),
					options: { height: this.guardHeight }
				});

				// Add the left side
				result.push({
					data: (0, _encoder2.default)(this.data.substr(1, 5), "LLLLL"),
					text: this.text.substr(1, 5),
					options: { fontSize: this.fontSize }
				});

				// Add the middle bits
				result.push({
					data: "01010",
					options: { height: this.guardHeight }
				});

				// Add the right side
				result.push({
					data: (0, _encoder2.default)(this.data.substr(6, 5), "RRRRR"),
					text: this.text.substr(6, 5),
					options: { fontSize: this.fontSize }
				});

				// Add the end bits
				result.push({
					data: (0, _encoder2.default)(this.data[11], "R") + "101",
					options: { height: this.guardHeight }
				});

				// Add the last digit
				if (this.displayValue) {
					result.push({
						data: "00000000",
						text: this.text.substr(11, 1),
						options: { textAlign: "right", fontSize: this.fontSize }
					});
				}

				return result;
			}
		}]);

		return UPC;
	}(_Barcode3.default);

	// Calulate the checksum digit
	// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


	function checksum(number) {
		var result = 0;

		var i;
		for (i = 1; i < 11; i += 2) {
			result += parseInt(number[i]);
		}
		for (i = 0; i < 11; i += 2) {
			result += parseInt(number[i]) * 3;
		}

		return (10 - result % 10) % 10;
	}

	exports.default = UPC;
	});

	var UPCE_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _encoder2 = _interopRequireDefault(encoder);



	var _Barcode3 = _interopRequireDefault(Barcode_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
	// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
	//
	// UPC-E documentation:
	// https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E

	var EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];

	var PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];

	var UPCE = function (_Barcode) {
		_inherits(UPCE, _Barcode);

		function UPCE(data, options) {
			_classCallCheck(this, UPCE);

			var _this = _possibleConstructorReturn(this, (UPCE.__proto__ || Object.getPrototypeOf(UPCE)).call(this, data, options));
			// Code may be 6 or 8 digits;
			// A 7 digit code is ambiguous as to whether the extra digit
			// is a UPC-A check or number system digit.


			_this.isValid = false;
			if (data.search(/^[0-9]{6}$/) !== -1) {
				_this.middleDigits = data;
				_this.upcA = expandToUPCA(data, "0");
				_this.text = options.text || '' + _this.upcA[0] + data + _this.upcA[_this.upcA.length - 1];
				_this.isValid = true;
			} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
				_this.middleDigits = data.substring(1, data.length - 1);
				_this.upcA = expandToUPCA(_this.middleDigits, data[0]);

				if (_this.upcA[_this.upcA.length - 1] === data[data.length - 1]) {
					_this.isValid = true;
				} else {
					// checksum mismatch
					return _possibleConstructorReturn(_this);
				}
			} else {
				return _possibleConstructorReturn(_this);
			}

			_this.displayValue = options.displayValue;

			// Make sure the font is not bigger than the space between the guard bars
			if (options.fontSize > options.width * 10) {
				_this.fontSize = options.width * 10;
			} else {
				_this.fontSize = options.fontSize;
			}

			// Make the guard bars go down half the way of the text
			_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
			return _this;
		}

		_createClass(UPCE, [{
			key: 'valid',
			value: function valid() {
				return this.isValid;
			}
		}, {
			key: 'encode',
			value: function encode() {
				if (this.options.flat) {
					return this.flatEncoding();
				} else {
					return this.guardedEncoding();
				}
			}
		}, {
			key: 'flatEncoding',
			value: function flatEncoding() {
				var result = "";

				result += "101";
				result += this.encodeMiddleDigits();
				result += "010101";

				return {
					data: result,
					text: this.text
				};
			}
		}, {
			key: 'guardedEncoding',
			value: function guardedEncoding() {
				var result = [];

				// Add the UPC-A number system digit beneath the quiet zone
				if (this.displayValue) {
					result.push({
						data: "00000000",
						text: this.text[0],
						options: { textAlign: "left", fontSize: this.fontSize }
					});
				}

				// Add the guard bars
				result.push({
					data: "101",
					options: { height: this.guardHeight }
				});

				// Add the 6 UPC-E digits
				result.push({
					data: this.encodeMiddleDigits(),
					text: this.text.substring(1, 7),
					options: { fontSize: this.fontSize }
				});

				// Add the end bits
				result.push({
					data: "010101",
					options: { height: this.guardHeight }
				});

				// Add the UPC-A check digit beneath the quiet zone
				if (this.displayValue) {
					result.push({
						data: "00000000",
						text: this.text[7],
						options: { textAlign: "right", fontSize: this.fontSize }
					});
				}

				return result;
			}
		}, {
			key: 'encodeMiddleDigits',
			value: function encodeMiddleDigits() {
				var numberSystem = this.upcA[0];
				var checkDigit = this.upcA[this.upcA.length - 1];
				var parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
				return (0, _encoder2.default)(this.middleDigits, parity);
			}
		}]);

		return UPCE;
	}(_Barcode3.default);

	function expandToUPCA(middleDigits, numberSystem) {
		var lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
		var expansion = EXPANSIONS[lastUpcE];

		var result = "";
		var digitIndex = 0;
		for (var i = 0; i < expansion.length; i++) {
			var c = expansion[i];
			if (c === 'X') {
				result += middleDigits[digitIndex++];
			} else {
				result += c;
			}
		}

		result = '' + numberSystem + result;
		return '' + result + (0, UPC_1.checksum)(result);
	}

	exports.default = UPCE;
	});

	var EAN_UPC = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.UPCE = exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;



	var _EAN2 = _interopRequireDefault(EAN13_1);



	var _EAN4 = _interopRequireDefault(EAN8_1);



	var _EAN6 = _interopRequireDefault(EAN5_1);



	var _EAN8 = _interopRequireDefault(EAN2_1);



	var _UPC2 = _interopRequireDefault(UPC_1);



	var _UPCE2 = _interopRequireDefault(UPCE_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.EAN13 = _EAN2.default;
	exports.EAN8 = _EAN4.default;
	exports.EAN5 = _EAN6.default;
	exports.EAN2 = _EAN8.default;
	exports.UPC = _UPC2.default;
	exports.UPCE = _UPCE2.default;
	});

	var constants$2 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var START_BIN = exports.START_BIN = '1010';
	var END_BIN = exports.END_BIN = '11101';

	var BINARIES = exports.BINARIES = ['00110', '10001', '01001', '11000', '00101', '10100', '01100', '00011', '10010', '01010'];
	});

	var ITF_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();





	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ITF = function (_Barcode) {
		_inherits(ITF, _Barcode);

		function ITF() {
			_classCallCheck(this, ITF);

			return _possibleConstructorReturn(this, (ITF.__proto__ || Object.getPrototypeOf(ITF)).apply(this, arguments));
		}

		_createClass(ITF, [{
			key: 'valid',
			value: function valid() {
				return this.data.search(/^([0-9]{2})+$/) !== -1;
			}
		}, {
			key: 'encode',
			value: function encode() {
				var _this2 = this;

				// Calculate all the digit pairs
				var encoded = this.data.match(/.{2}/g).map(function (pair) {
					return _this2.encodePair(pair);
				}).join('');

				return {
					data: constants$2.START_BIN + encoded + constants$2.END_BIN,
					text: this.text
				};
			}

			// Calculate the data of a number pair

		}, {
			key: 'encodePair',
			value: function encodePair(pair) {
				var second = constants$2.BINARIES[pair[1]];

				return constants$2.BINARIES[pair[0]].split('').map(function (first, idx) {
					return (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0');
				}).join('');
			}
		}]);

		return ITF;
	}(_Barcode3.default);

	exports.default = ITF;
	});

	var ITF14_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _ITF3 = _interopRequireDefault(ITF_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Calculate the checksum digit
	var checksum = function checksum(data) {
		var res = data.substr(0, 13).split('').map(function (num) {
			return parseInt(num, 10);
		}).reduce(function (sum, n, idx) {
			return sum + n * (3 - idx % 2 * 2);
		}, 0);

		return Math.ceil(res / 10) * 10 - res;
	};

	var ITF14 = function (_ITF) {
		_inherits(ITF14, _ITF);

		function ITF14(data, options) {
			_classCallCheck(this, ITF14);

			// Add checksum if it does not exist
			if (data.search(/^[0-9]{13}$/) !== -1) {
				data += checksum(data);
			}
			return _possibleConstructorReturn(this, (ITF14.__proto__ || Object.getPrototypeOf(ITF14)).call(this, data, options));
		}

		_createClass(ITF14, [{
			key: 'valid',
			value: function valid() {
				return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
			}
		}]);

		return ITF14;
	}(_ITF3.default);

	exports.default = ITF14;
	});

	var ITF = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ITF14 = exports.ITF = undefined;



	var _ITF2 = _interopRequireDefault(ITF_1);



	var _ITF4 = _interopRequireDefault(ITF14_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.ITF = _ITF2.default;
	exports.ITF14 = _ITF4.default;
	});

	var MSI_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
	// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

	var MSI = function (_Barcode) {
		_inherits(MSI, _Barcode);

		function MSI(data, options) {
			_classCallCheck(this, MSI);

			return _possibleConstructorReturn(this, (MSI.__proto__ || Object.getPrototypeOf(MSI)).call(this, data, options));
		}

		_createClass(MSI, [{
			key: "encode",
			value: function encode() {
				// Start bits
				var ret = "110";

				for (var i = 0; i < this.data.length; i++) {
					// Convert the character to binary (always 4 binary digits)
					var digit = parseInt(this.data[i]);
					var bin = digit.toString(2);
					bin = addZeroes(bin, 4 - bin.length);

					// Add 100 for every zero and 110 for every 1
					for (var b = 0; b < bin.length; b++) {
						ret += bin[b] == "0" ? "100" : "110";
					}
				}

				// End bits
				ret += "1001";

				return {
					data: ret,
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function valid() {
				return this.data.search(/^[0-9]+$/) !== -1;
			}
		}]);

		return MSI;
	}(_Barcode3.default);

	function addZeroes(number, n) {
		for (var i = 0; i < n; i++) {
			number = "0" + number;
		}
		return number;
	}

	exports.default = MSI;
	});

	var checksums = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.mod10 = mod10;
	exports.mod11 = mod11;
	function mod10(number) {
		var sum = 0;
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[i]);
			if ((i + number.length) % 2 === 0) {
				sum += n;
			} else {
				sum += n * 2 % 10 + Math.floor(n * 2 / 10);
			}
		}
		return (10 - sum % 10) % 10;
	}

	function mod11(number) {
		var sum = 0;
		var weights = [2, 3, 4, 5, 6, 7];
		for (var i = 0; i < number.length; i++) {
			var n = parseInt(number[number.length - 1 - i]);
			sum += weights[i % weights.length] * n;
		}
		return (11 - sum % 11) % 11;
	}
	});

	var MSI10_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var _MSI3 = _interopRequireDefault(MSI_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI10 = function (_MSI) {
		_inherits(MSI10, _MSI);

		function MSI10(data, options) {
			_classCallCheck(this, MSI10);

			return _possibleConstructorReturn(this, (MSI10.__proto__ || Object.getPrototypeOf(MSI10)).call(this, data + (0, checksums.mod10)(data), options));
		}

		return MSI10;
	}(_MSI3.default);

	exports.default = MSI10;
	});

	var MSI11_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var _MSI3 = _interopRequireDefault(MSI_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI11 = function (_MSI) {
		_inherits(MSI11, _MSI);

		function MSI11(data, options) {
			_classCallCheck(this, MSI11);

			return _possibleConstructorReturn(this, (MSI11.__proto__ || Object.getPrototypeOf(MSI11)).call(this, data + (0, checksums.mod11)(data), options));
		}

		return MSI11;
	}(_MSI3.default);

	exports.default = MSI11;
	});

	var MSI1010_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var _MSI3 = _interopRequireDefault(MSI_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI1010 = function (_MSI) {
		_inherits(MSI1010, _MSI);

		function MSI1010(data, options) {
			_classCallCheck(this, MSI1010);

			data += (0, checksums.mod10)(data);
			data += (0, checksums.mod10)(data);
			return _possibleConstructorReturn(this, (MSI1010.__proto__ || Object.getPrototypeOf(MSI1010)).call(this, data, options));
		}

		return MSI1010;
	}(_MSI3.default);

	exports.default = MSI1010;
	});

	var MSI1110_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var _MSI3 = _interopRequireDefault(MSI_1);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MSI1110 = function (_MSI) {
		_inherits(MSI1110, _MSI);

		function MSI1110(data, options) {
			_classCallCheck(this, MSI1110);

			data += (0, checksums.mod11)(data);
			data += (0, checksums.mod10)(data);
			return _possibleConstructorReturn(this, (MSI1110.__proto__ || Object.getPrototypeOf(MSI1110)).call(this, data, options));
		}

		return MSI1110;
	}(_MSI3.default);

	exports.default = MSI1110;
	});

	var MSI = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;



	var _MSI2 = _interopRequireDefault(MSI_1);



	var _MSI4 = _interopRequireDefault(MSI10_1);



	var _MSI6 = _interopRequireDefault(MSI11_1);



	var _MSI8 = _interopRequireDefault(MSI1010_1);



	var _MSI10 = _interopRequireDefault(MSI1110_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.MSI = _MSI2.default;
	exports.MSI10 = _MSI4.default;
	exports.MSI11 = _MSI6.default;
	exports.MSI1010 = _MSI8.default;
	exports.MSI1110 = _MSI10.default;
	});

	var pharmacode_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.pharmacode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
	// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

	var pharmacode = function (_Barcode) {
		_inherits(pharmacode, _Barcode);

		function pharmacode(data, options) {
			_classCallCheck(this, pharmacode);

			var _this = _possibleConstructorReturn(this, (pharmacode.__proto__ || Object.getPrototypeOf(pharmacode)).call(this, data, options));

			_this.number = parseInt(data, 10);
			return _this;
		}

		_createClass(pharmacode, [{
			key: "encode",
			value: function encode() {
				var z = this.number;
				var result = "";

				// http://i.imgur.com/RMm4UDJ.png
				// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
				while (!isNaN(z) && z != 0) {
					if (z % 2 === 0) {
						// Even
						result = "11100" + result;
						z = (z - 2) / 2;
					} else {
						// Odd
						result = "100" + result;
						z = (z - 1) / 2;
					}
				}

				// Remove the two last zeroes
				result = result.slice(0, -2);

				return {
					data: result,
					text: this.text
				};
			}
		}, {
			key: "valid",
			value: function valid() {
				return this.number >= 3 && this.number <= 131070;
			}
		}]);

		return pharmacode;
	}(_Barcode3.default);

	exports.pharmacode = pharmacode;
	});

	var codabar_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.codabar = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding specification:
	// http://www.barcodeisland.com/codabar.phtml

	var codabar = function (_Barcode) {
		_inherits(codabar, _Barcode);

		function codabar(data, options) {
			_classCallCheck(this, codabar);

			if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
				data = "A" + data + "A";
			}

			var _this = _possibleConstructorReturn(this, (codabar.__proto__ || Object.getPrototypeOf(codabar)).call(this, data.toUpperCase(), options));

			_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
			return _this;
		}

		_createClass(codabar, [{
			key: "valid",
			value: function valid() {
				return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
			}
		}, {
			key: "encode",
			value: function encode() {
				var result = [];
				var encodings = this.getEncodings();
				for (var i = 0; i < this.data.length; i++) {
					result.push(encodings[this.data.charAt(i)]);
					// for all characters except the last, append a narrow-space ("0")
					if (i !== this.data.length - 1) {
						result.push("0");
					}
				}
				return {
					text: this.text,
					data: result.join('')
				};
			}
		}, {
			key: "getEncodings",
			value: function getEncodings() {
				return {
					"0": "101010011",
					"1": "101011001",
					"2": "101001011",
					"3": "110010101",
					"4": "101101001",
					"5": "110101001",
					"6": "100101011",
					"7": "100101101",
					"8": "100110101",
					"9": "110100101",
					"-": "101001101",
					"$": "101100101",
					":": "1101011011",
					"/": "1101101011",
					".": "1101101101",
					"+": "101100110011",
					"A": "1011001001",
					"B": "1001001011",
					"C": "1010010011",
					"D": "1010011001"
				};
			}
		}]);

		return codabar;
	}(_Barcode3.default);

	exports.codabar = codabar;
	});

	var GenericBarcode_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GenericBarcode = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _Barcode3 = _interopRequireDefault(Barcode_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GenericBarcode = function (_Barcode) {
		_inherits(GenericBarcode, _Barcode);

		function GenericBarcode(data, options) {
			_classCallCheck(this, GenericBarcode);

			return _possibleConstructorReturn(this, (GenericBarcode.__proto__ || Object.getPrototypeOf(GenericBarcode)).call(this, data, options)); // Sets this.data and this.text
		}

		// Return the corresponding binary numbers for the data provided


		_createClass(GenericBarcode, [{
			key: "encode",
			value: function encode() {
				return {
					data: "10101010101010101010101010101010101010101",
					text: this.text
				};
			}

			// Resturn true/false if the string provided is valid for this encoder

		}, {
			key: "valid",
			value: function valid() {
				return true;
			}
		}]);

		return GenericBarcode;
	}(_Barcode3.default);

	exports.GenericBarcode = GenericBarcode;
	});

	var barcodes = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

















	exports.default = {
		CODE39: CODE39_1.CODE39,
		CODE128: CODE128.CODE128, CODE128A: CODE128.CODE128A, CODE128B: CODE128.CODE128B, CODE128C: CODE128.CODE128C,
		EAN13: EAN_UPC.EAN13, EAN8: EAN_UPC.EAN8, EAN5: EAN_UPC.EAN5, EAN2: EAN_UPC.EAN2, UPC: EAN_UPC.UPC, UPCE: EAN_UPC.UPCE,
		ITF14: ITF.ITF14,
		ITF: ITF.ITF,
		MSI: MSI.MSI, MSI10: MSI.MSI10, MSI11: MSI.MSI11, MSI1010: MSI.MSI1010, MSI1110: MSI.MSI1110,
		pharmacode: pharmacode_1.pharmacode,
		codabar: codabar_1.codabar,
		GenericBarcode: GenericBarcode_1.GenericBarcode
	};
	});

	var merge = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = function (old, replaceObj) {
	  return _extends({}, old, replaceObj);
	};
	});

	var linearizeEncodings_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = linearizeEncodings;

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]

	function linearizeEncodings(encodings) {
		var linearEncodings = [];
		function nextLevel(encoded) {
			if (Array.isArray(encoded)) {
				for (var i = 0; i < encoded.length; i++) {
					nextLevel(encoded[i]);
				}
			} else {
				encoded.text = encoded.text || "";
				encoded.data = encoded.data || "";
				linearEncodings.push(encoded);
			}
		}
		nextLevel(encodings);

		return linearEncodings;
	}
	});

	var fixOptions_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = fixOptions;


	function fixOptions(options) {
		// Fix the margins
		options.marginTop = options.marginTop || options.margin;
		options.marginBottom = options.marginBottom || options.margin;
		options.marginRight = options.marginRight || options.margin;
		options.marginLeft = options.marginLeft || options.margin;

		return options;
	}
	});

	var optionsFromStrings_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = optionsFromStrings;

	// Convert string to integers/booleans where it should be

	function optionsFromStrings(options) {
		var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

		for (var intOption in intOptions) {
			if (intOptions.hasOwnProperty(intOption)) {
				intOption = intOptions[intOption];
				if (typeof options[intOption] === "string") {
					options[intOption] = parseInt(options[intOption], 10);
				}
			}
		}

		if (typeof options["displayValue"] === "string") {
			options["displayValue"] = options["displayValue"] != "false";
		}

		return options;
	}
	});

	var defaults_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var defaults = {
		width: 2,
		height: 100,
		format: "auto",
		displayValue: true,
		fontOptions: "",
		font: "monospace",
		text: undefined,
		textAlign: "center",
		textPosition: "bottom",
		textMargin: 2,
		fontSize: 20,
		background: "#ffffff",
		lineColor: "#000000",
		margin: 10,
		marginTop: undefined,
		marginBottom: undefined,
		marginLeft: undefined,
		marginRight: undefined,
		valid: function valid() {}
	};

	exports.default = defaults;
	});

	var getOptionsFromElement_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});



	var _optionsFromStrings2 = _interopRequireDefault(optionsFromStrings_1);



	var _defaults2 = _interopRequireDefault(defaults_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getOptionsFromElement(element) {
		var options = {};
		for (var property in _defaults2.default) {
			if (_defaults2.default.hasOwnProperty(property)) {
				// jsbarcode-*
				if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
					options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
				}

				// data-*
				if (element.hasAttribute("data-" + property.toLowerCase())) {
					options[property] = element.getAttribute("data-" + property.toLowerCase());
				}
			}
		}

		options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

		// Since all atributes are string they need to be converted to integers
		options = (0, _optionsFromStrings2.default)(options);

		return options;
	}

	exports.default = getOptionsFromElement;
	});

	var shared = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = undefined;



	var _merge2 = _interopRequireDefault(merge);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getEncodingHeight(encoding, options) {
		return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
	}

	function getBarcodePadding(textWidth, barcodeWidth, options) {
		if (options.displayValue && barcodeWidth < textWidth) {
			if (options.textAlign == "center") {
				return Math.floor((textWidth - barcodeWidth) / 2);
			} else if (options.textAlign == "left") {
				return 0;
			} else if (options.textAlign == "right") {
				return Math.floor(textWidth - barcodeWidth);
			}
		}
		return 0;
	}

	function calculateEncodingAttributes(encodings, barcodeOptions, context) {
		for (var i = 0; i < encodings.length; i++) {
			var encoding = encodings[i];
			var options = (0, _merge2.default)(barcodeOptions, encoding.options);

			// Calculate the width of the encoding
			var textWidth;
			if (options.displayValue) {
				textWidth = messureText(encoding.text, options, context);
			} else {
				textWidth = 0;
			}

			var barcodeWidth = encoding.data.length * options.width;
			encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

			encoding.height = getEncodingHeight(encoding, options);

			encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
		}
	}

	function getTotalWidthOfEncodings(encodings) {
		var totalWidth = 0;
		for (var i = 0; i < encodings.length; i++) {
			totalWidth += encodings[i].width;
		}
		return totalWidth;
	}

	function getMaximumHeightOfEncodings(encodings) {
		var maxHeight = 0;
		for (var i = 0; i < encodings.length; i++) {
			if (encodings[i].height > maxHeight) {
				maxHeight = encodings[i].height;
			}
		}
		return maxHeight;
	}

	function messureText(string, options, context) {
		var ctx;

		if (context) {
			ctx = context;
		} else if (typeof document !== "undefined") {
			ctx = document.createElement("canvas").getContext("2d");
		} else {
			// If the text cannot be messured we will return 0.
			// This will make some barcode with big text render incorrectly
			return 0;
		}
		ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

		// Calculate the width of the encoding
		var size = ctx.measureText(string).width;

		return size;
	}

	exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
	exports.getEncodingHeight = getEncodingHeight;
	exports.getBarcodePadding = getBarcodePadding;
	exports.calculateEncodingAttributes = calculateEncodingAttributes;
	exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;
	});

	var canvas = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _merge2 = _interopRequireDefault(merge);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var CanvasRenderer = function () {
		function CanvasRenderer(canvas, encodings, options) {
			_classCallCheck(this, CanvasRenderer);

			this.canvas = canvas;
			this.encodings = encodings;
			this.options = options;
		}

		_createClass(CanvasRenderer, [{
			key: "render",
			value: function render() {
				// Abort if the browser does not support HTML5 canvas
				if (!this.canvas.getContext) {
					throw new Error('The browser does not support canvas.');
				}

				this.prepareCanvas();
				for (var i = 0; i < this.encodings.length; i++) {
					var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);

					this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
					this.drawCanvasText(encodingOptions, this.encodings[i]);

					this.moveCanvasDrawing(this.encodings[i]);
				}

				this.restoreCanvas();
			}
		}, {
			key: "prepareCanvas",
			value: function prepareCanvas() {
				// Get the canvas context
				var ctx = this.canvas.getContext("2d");

				ctx.save();

				(0, shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
				var totalWidth = (0, shared.getTotalWidthOfEncodings)(this.encodings);
				var maxHeight = (0, shared.getMaximumHeightOfEncodings)(this.encodings);

				this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

				this.canvas.height = maxHeight;

				// Paint the canvas
				ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
				if (this.options.background) {
					ctx.fillStyle = this.options.background;
					ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
				}

				ctx.translate(this.options.marginLeft, 0);
			}
		}, {
			key: "drawCanvasBarcode",
			value: function drawCanvasBarcode(options, encoding) {
				// Get the canvas context
				var ctx = this.canvas.getContext("2d");

				var binary = encoding.data;

				// Creates the barcode out of the encoded binary
				var yFrom;
				if (options.textPosition == "top") {
					yFrom = options.marginTop + options.fontSize + options.textMargin;
				} else {
					yFrom = options.marginTop;
				}

				ctx.fillStyle = options.lineColor;

				for (var b = 0; b < binary.length; b++) {
					var x = b * options.width + encoding.barcodePadding;

					if (binary[b] === "1") {
						ctx.fillRect(x, yFrom, options.width, options.height);
					} else if (binary[b]) {
						ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
					}
				}
			}
		}, {
			key: "drawCanvasText",
			value: function drawCanvasText(options, encoding) {
				// Get the canvas context
				var ctx = this.canvas.getContext("2d");

				var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

				// Draw the text if displayValue is set
				if (options.displayValue) {
					var x, y;

					if (options.textPosition == "top") {
						y = options.marginTop + options.fontSize - options.textMargin;
					} else {
						y = options.height + options.textMargin + options.marginTop + options.fontSize;
					}

					ctx.font = font;

					// Draw the text in the correct X depending on the textAlign option
					if (options.textAlign == "left" || encoding.barcodePadding > 0) {
						x = 0;
						ctx.textAlign = 'left';
					} else if (options.textAlign == "right") {
						x = encoding.width - 1;
						ctx.textAlign = 'right';
					}
					// In all other cases, center the text
					else {
							x = encoding.width / 2;
							ctx.textAlign = 'center';
						}

					ctx.fillText(encoding.text, x, y);
				}
			}
		}, {
			key: "moveCanvasDrawing",
			value: function moveCanvasDrawing(encoding) {
				var ctx = this.canvas.getContext("2d");

				ctx.translate(encoding.width, 0);
			}
		}, {
			key: "restoreCanvas",
			value: function restoreCanvas() {
				// Get the canvas context
				var ctx = this.canvas.getContext("2d");

				ctx.restore();
			}
		}]);

		return CanvasRenderer;
	}();

	exports.default = CanvasRenderer;
	});

	var svg = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();



	var _merge2 = _interopRequireDefault(merge);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var svgns = "http://www.w3.org/2000/svg";

	var SVGRenderer = function () {
		function SVGRenderer(svg, encodings, options) {
			_classCallCheck(this, SVGRenderer);

			this.svg = svg;
			this.encodings = encodings;
			this.options = options;
			this.document = options.xmlDocument || document;
		}

		_createClass(SVGRenderer, [{
			key: "render",
			value: function render() {
				var currentX = this.options.marginLeft;

				this.prepareSVG();
				for (var i = 0; i < this.encodings.length; i++) {
					var encoding = this.encodings[i];
					var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

					var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);

					this.setGroupOptions(group, encodingOptions);

					this.drawSvgBarcode(group, encodingOptions, encoding);
					this.drawSVGText(group, encodingOptions, encoding);

					currentX += encoding.width;
				}
			}
		}, {
			key: "prepareSVG",
			value: function prepareSVG() {
				// Clear the SVG
				while (this.svg.firstChild) {
					this.svg.removeChild(this.svg.firstChild);
				}

				(0, shared.calculateEncodingAttributes)(this.encodings, this.options);
				var totalWidth = (0, shared.getTotalWidthOfEncodings)(this.encodings);
				var maxHeight = (0, shared.getMaximumHeightOfEncodings)(this.encodings);

				var width = totalWidth + this.options.marginLeft + this.options.marginRight;
				this.setSvgAttributes(width, maxHeight);

				if (this.options.background) {
					this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
				}
			}
		}, {
			key: "drawSvgBarcode",
			value: function drawSvgBarcode(parent, options, encoding) {
				var binary = encoding.data;

				// Creates the barcode out of the encoded binary
				var yFrom;
				if (options.textPosition == "top") {
					yFrom = options.fontSize + options.textMargin;
				} else {
					yFrom = 0;
				}

				var barWidth = 0;
				var x = 0;
				for (var b = 0; b < binary.length; b++) {
					x = b * options.width + encoding.barcodePadding;

					if (binary[b] === "1") {
						barWidth++;
					} else if (barWidth > 0) {
						this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
						barWidth = 0;
					}
				}

				// Last draw is needed since the barcode ends with 1
				if (barWidth > 0) {
					this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
				}
			}
		}, {
			key: "drawSVGText",
			value: function drawSVGText(parent, options, encoding) {
				var textElem = this.document.createElementNS(svgns, 'text');

				// Draw the text if displayValue is set
				if (options.displayValue) {
					var x, y;

					textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

					if (options.textPosition == "top") {
						y = options.fontSize - options.textMargin;
					} else {
						y = options.height + options.textMargin + options.fontSize;
					}

					// Draw the text in the correct X depending on the textAlign option
					if (options.textAlign == "left" || encoding.barcodePadding > 0) {
						x = 0;
						textElem.setAttribute("text-anchor", "start");
					} else if (options.textAlign == "right") {
						x = encoding.width - 1;
						textElem.setAttribute("text-anchor", "end");
					}
					// In all other cases, center the text
					else {
							x = encoding.width / 2;
							textElem.setAttribute("text-anchor", "middle");
						}

					textElem.setAttribute("x", x);
					textElem.setAttribute("y", y);

					textElem.appendChild(this.document.createTextNode(encoding.text));

					parent.appendChild(textElem);
				}
			}
		}, {
			key: "setSvgAttributes",
			value: function setSvgAttributes(width, height) {
				var svg = this.svg;
				svg.setAttribute("width", width + "px");
				svg.setAttribute("height", height + "px");
				svg.setAttribute("x", "0px");
				svg.setAttribute("y", "0px");
				svg.setAttribute("viewBox", "0 0 " + width + " " + height);

				svg.setAttribute("xmlns", svgns);
				svg.setAttribute("version", "1.1");

				svg.setAttribute("style", "transform: translate(0,0)");
			}
		}, {
			key: "createGroup",
			value: function createGroup(x, y, parent) {
				var group = this.document.createElementNS(svgns, 'g');
				group.setAttribute("transform", "translate(" + x + ", " + y + ")");

				parent.appendChild(group);

				return group;
			}
		}, {
			key: "setGroupOptions",
			value: function setGroupOptions(group, options) {
				group.setAttribute("style", "fill:" + options.lineColor + ";");
			}
		}, {
			key: "drawRect",
			value: function drawRect(x, y, width, height, parent) {
				var rect = this.document.createElementNS(svgns, 'rect');

				rect.setAttribute("x", x);
				rect.setAttribute("y", y);
				rect.setAttribute("width", width);
				rect.setAttribute("height", height);

				parent.appendChild(rect);

				return rect;
			}
		}]);

		return SVGRenderer;
	}();

	exports.default = SVGRenderer;
	});

	var object = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ObjectRenderer = function () {
		function ObjectRenderer(object, encodings, options) {
			_classCallCheck(this, ObjectRenderer);

			this.object = object;
			this.encodings = encodings;
			this.options = options;
		}

		_createClass(ObjectRenderer, [{
			key: "render",
			value: function render() {
				this.object.encodings = this.encodings;
			}
		}]);

		return ObjectRenderer;
	}();

	exports.default = ObjectRenderer;
	});

	var renderers = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});



	var _canvas2 = _interopRequireDefault(canvas);



	var _svg2 = _interopRequireDefault(svg);



	var _object2 = _interopRequireDefault(object);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };
	});

	var exceptions = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var InvalidInputException = function (_Error) {
		_inherits(InvalidInputException, _Error);

		function InvalidInputException(symbology, input) {
			_classCallCheck(this, InvalidInputException);

			var _this = _possibleConstructorReturn(this, (InvalidInputException.__proto__ || Object.getPrototypeOf(InvalidInputException)).call(this));

			_this.name = "InvalidInputException";

			_this.symbology = symbology;
			_this.input = input;

			_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
			return _this;
		}

		return InvalidInputException;
	}(Error);

	var InvalidElementException = function (_Error2) {
		_inherits(InvalidElementException, _Error2);

		function InvalidElementException() {
			_classCallCheck(this, InvalidElementException);

			var _this2 = _possibleConstructorReturn(this, (InvalidElementException.__proto__ || Object.getPrototypeOf(InvalidElementException)).call(this));

			_this2.name = "InvalidElementException";
			_this2.message = "Not supported type to render on";
			return _this2;
		}

		return InvalidElementException;
	}(Error);

	var NoElementException = function (_Error3) {
		_inherits(NoElementException, _Error3);

		function NoElementException() {
			_classCallCheck(this, NoElementException);

			var _this3 = _possibleConstructorReturn(this, (NoElementException.__proto__ || Object.getPrototypeOf(NoElementException)).call(this));

			_this3.name = "NoElementException";
			_this3.message = "No element to render on.";
			return _this3;
		}

		return NoElementException;
	}(Error);

	exports.InvalidInputException = InvalidInputException;
	exports.InvalidElementException = InvalidElementException;
	exports.NoElementException = NoElementException;
	});

	var getRenderProperties_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global HTMLImageElement */
	/* global HTMLCanvasElement */
	/* global SVGElement */



	var _getOptionsFromElement2 = _interopRequireDefault(getOptionsFromElement_1);



	var _renderers2 = _interopRequireDefault(renderers);



	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Takes an element and returns an object with information about how
	// it should be rendered
	// This could also return an array with these objects
	// {
	//   element: The element that the renderer should draw on
	//   renderer: The name of the renderer
	//   afterRender (optional): If something has to done after the renderer
	//     completed, calls afterRender (function)
	//   options (optional): Options that can be defined in the element
	// }

	function getRenderProperties(element) {
		// If the element is a string, query select call again
		if (typeof element === "string") {
			return querySelectedRenderProperties(element);
		}
		// If element is array. Recursivly call with every object in the array
		else if (Array.isArray(element)) {
				var returnArray = [];
				for (var i = 0; i < element.length; i++) {
					returnArray.push(getRenderProperties(element[i]));
				}
				return returnArray;
			}
			// If element, render on canvas and set the uri as src
			else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
					return newCanvasRenderProperties(element);
				}
				// If SVG
				else if (element && element.nodeName === 'svg' || typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element),
							renderer: _renderers2.default.SVGRenderer
						};
					}
					// If canvas (in browser)
					else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
							return {
								element: element,
								options: (0, _getOptionsFromElement2.default)(element),
								renderer: _renderers2.default.CanvasRenderer
							};
						}
						// If canvas (in node)
						else if (element && element.getContext) {
								return {
									element: element,
									renderer: _renderers2.default.CanvasRenderer
								};
							} else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === 'object' && !element.nodeName) {
								return {
									element: element,
									renderer: _renderers2.default.ObjectRenderer
								};
							} else {
								throw new exceptions.InvalidElementException();
							}
	}

	function querySelectedRenderProperties(string) {
		var selector = document.querySelectorAll(string);
		if (selector.length === 0) {
			return undefined;
		} else {
			var returnArray = [];
			for (var i = 0; i < selector.length; i++) {
				returnArray.push(getRenderProperties(selector[i]));
			}
			return returnArray;
		}
	}

	function newCanvasRenderProperties(imgElement) {
		var canvas = document.createElement('canvas');
		return {
			element: canvas,
			options: (0, _getOptionsFromElement2.default)(imgElement),
			renderer: _renderers2.default.CanvasRenderer,
			afterRender: function afterRender() {
				imgElement.setAttribute("src", canvas.toDataURL());
			}
		};
	}

	exports.default = getRenderProperties;
	});

	var ErrorHandler_1 = createCommonjsModule(function (module, exports) {

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*eslint no-console: 0 */

	var ErrorHandler = function () {
		function ErrorHandler(api) {
			_classCallCheck(this, ErrorHandler);

			this.api = api;
		}

		_createClass(ErrorHandler, [{
			key: "handleCatch",
			value: function handleCatch(e) {
				// If babel supported extending of Error in a correct way instanceof would be used here
				if (e.name === "InvalidInputException") {
					if (this.api._options.valid !== this.api._defaults.valid) {
						this.api._options.valid(false);
					} else {
						throw e.message;
					}
				} else {
					throw e;
				}

				this.api.render = function () {};
			}
		}, {
			key: "wrapBarcodeCall",
			value: function wrapBarcodeCall(func) {
				try {
					var result = func.apply(undefined, arguments);
					this.api._options.valid(true);
					return result;
				} catch (e) {
					this.handleCatch(e);

					return this.api;
				}
			}
		}]);

		return ErrorHandler;
	}();

	exports.default = ErrorHandler;
	});

	var JsBarcode_1 = createCommonjsModule(function (module) {



	var _barcodes2 = _interopRequireDefault(barcodes);



	var _merge2 = _interopRequireDefault(merge);



	var _linearizeEncodings2 = _interopRequireDefault(linearizeEncodings_1);



	var _fixOptions2 = _interopRequireDefault(fixOptions_1);



	var _getRenderProperties2 = _interopRequireDefault(getRenderProperties_1);



	var _optionsFromStrings2 = _interopRequireDefault(optionsFromStrings_1);



	var _ErrorHandler2 = _interopRequireDefault(ErrorHandler_1);





	var _defaults2 = _interopRequireDefault(defaults_1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// The protype of the object returned from the JsBarcode() call


	// Help functions
	var API = function API() {};

	// The first call of the library API
	// Will return an object with all barcodes calls and the data that is used
	// by the renderers


	// Default values


	// Exceptions
	// Import all the barcodes
	var JsBarcode = function JsBarcode(element, text, options) {
		var api = new API();

		if (typeof element === "undefined") {
			throw Error("No element to render on was provided.");
		}

		// Variables that will be pased through the API calls
		api._renderProperties = (0, _getRenderProperties2.default)(element);
		api._encodings = [];
		api._options = _defaults2.default;
		api._errorHandler = new _ErrorHandler2.default(api);

		// If text is set, use the simple syntax (render the barcode directly)
		if (typeof text !== "undefined") {
			options = options || {};

			if (!options.format) {
				options.format = autoSelectBarcode();
			}

			api.options(options)[options.format](text, options).render();
		}

		return api;
	};

	// To make tests work TODO: remove
	JsBarcode.getModule = function (name) {
		return _barcodes2.default[name];
	};

	// Register all barcodes
	for (var name in _barcodes2.default) {
		if (_barcodes2.default.hasOwnProperty(name)) {
			// Security check if the propery is a prototype property
			registerBarcode(_barcodes2.default, name);
		}
	}
	function registerBarcode(barcodes, name) {
		API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
			var api = this;
			return api._errorHandler.wrapBarcodeCall(function () {
				// Ensure text is options.text
				options.text = typeof options.text === 'undefined' ? undefined : '' + options.text;

				var newOptions = (0, _merge2.default)(api._options, options);
				newOptions = (0, _optionsFromStrings2.default)(newOptions);
				var Encoder = barcodes[name];
				var encoded = encode(text, Encoder, newOptions);
				api._encodings.push(encoded);

				return api;
			});
		};
	}

	// encode() handles the Encoder call and builds the binary string to be rendered
	function encode(text, Encoder, options) {
		// Ensure that text is a string
		text = "" + text;

		var encoder = new Encoder(text, options);

		// If the input is not valid for the encoder, throw error.
		// If the valid callback option is set, call it instead of throwing error
		if (!encoder.valid()) {
			throw new exceptions.InvalidInputException(encoder.constructor.name, text);
		}

		// Make a request for the binary data (and other infromation) that should be rendered
		var encoded = encoder.encode();

		// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
		// Convert to [1-1, 1-2, 2, 3-1, 3-2]
		encoded = (0, _linearizeEncodings2.default)(encoded);

		// Merge
		for (var i = 0; i < encoded.length; i++) {
			encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
		}

		return encoded;
	}

	function autoSelectBarcode() {
		// If CODE128 exists. Use it
		if (_barcodes2.default["CODE128"]) {
			return "CODE128";
		}

		// Else, take the first (probably only) barcode
		return Object.keys(_barcodes2.default)[0];
	}

	// Sets global encoder options
	// Added to the api by the JsBarcode function
	API.prototype.options = function (options) {
		this._options = (0, _merge2.default)(this._options, options);
		return this;
	};

	// Will create a blank space (usually in between barcodes)
	API.prototype.blank = function (size) {
		var zeroes = new Array(size + 1).join("0");
		this._encodings.push({ data: zeroes });
		return this;
	};

	// Initialize JsBarcode on all HTML elements defined.
	API.prototype.init = function () {
		// Should do nothing if no elements where found
		if (!this._renderProperties) {
			return;
		}

		// Make sure renderProperies is an array
		if (!Array.isArray(this._renderProperties)) {
			this._renderProperties = [this._renderProperties];
		}

		var renderProperty;
		for (var i in this._renderProperties) {
			renderProperty = this._renderProperties[i];
			var options = (0, _merge2.default)(this._options, renderProperty.options);

			if (options.format == "auto") {
				options.format = autoSelectBarcode();
			}

			this._errorHandler.wrapBarcodeCall(function () {
				var text = options.value;
				var Encoder = _barcodes2.default[options.format.toUpperCase()];
				var encoded = encode(text, Encoder, options);

				render(renderProperty, encoded, options);
			});
		}
	};

	// The render API call. Calls the real render function.
	API.prototype.render = function () {
		if (!this._renderProperties) {
			throw new exceptions.NoElementException();
		}

		if (Array.isArray(this._renderProperties)) {
			for (var i = 0; i < this._renderProperties.length; i++) {
				render(this._renderProperties[i], this._encodings, this._options);
			}
		} else {
			render(this._renderProperties, this._encodings, this._options);
		}

		return this;
	};

	API.prototype._defaults = _defaults2.default;

	// Prepares the encodings and calls the renderer
	function render(renderProperties, encodings, options) {
		encodings = (0, _linearizeEncodings2.default)(encodings);

		for (var i = 0; i < encodings.length; i++) {
			encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
			(0, _fixOptions2.default)(encodings[i].options);
		}

		(0, _fixOptions2.default)(options);

		var Renderer = renderProperties.renderer;
		var renderer = new Renderer(renderProperties.element, encodings, options);
		renderer.render();

		if (renderProperties.afterRender) {
			renderProperties.afterRender();
		}
	}

	// Export to browser
	if (typeof window !== "undefined") {
		window.JsBarcode = JsBarcode;
	}

	// Export to jQuery
	/*global jQuery */
	if (typeof jQuery !== 'undefined') {
		jQuery.fn.JsBarcode = function (content, options) {
			var elementArray = [];
			jQuery(this).each(function () {
				elementArray.push(this);
			});
			return JsBarcode(elementArray, content, options);
		};
	}

	// Export to commonJS
	module.exports = JsBarcode;
	});

	var JsBarcode = /*@__PURE__*/unwrapExports(JsBarcode_1);

	const initialProps = {
	  format: "CODE128",
	  renderer: "svg",
	  width: 2,
	  height: 100,
	  displayValue: true,
	  fontOptions: "",
	  font: "Futura",
	  textAlign: "center",
	  textPosition: "bottom",
	  textMargin: 5,
	  fontSize: 50,
	  background: "#ffffff",
	  lineColor: "#000000",
	  margin: 10,
	  value: "JsBarcode for RiotJS",
	};

	var RiotBarcode = {
	  'css': `riot-barcode input,[is="riot-barcode"] input{ margin-bottom: 20px; font-size: 1.2rem; border-radius: 8px; border: 1px solid #333; height: 24px; padding: 10px; } riot-barcode .notification,[is="riot-barcode"] .notification{ font-size: 1.8rem; color: #ED4054; }`,

	  'exports': {
	    state: {
	      settings: initialProps
	    },

	    onBeforeMount(props, state) {
	      Object.keys(initialProps).map(key => {
	        props[key] && (state.settings[key] = props[key]);
	      });
	    },

	    onMounted() {
	      this.update();
	    },

	    onUpdated(props, state) {
	      const renderElement = this.$('[name="renderElement"]');
	      try {
	        new JsBarcode(renderElement, state.settings.value, Object.assign({}, state.settings));
	      } catch (e) {
	        // prevent stop the parent process
	        window.console.error(e);
	      }
	    },

	    handleChange(e) {
	      this.update({
	        settings: {
	          ...this.state.settings,
	          value: e.target.value || ""
	        }
	      });
	    }
	  },

	  'template': function(template, expressionTypes, bindingTypes, getComponent) {
	    return template(
	      '<p>Change input characters: </p><input expr131="expr131" name="text"/><div expr132="expr132"></div><p expr136="expr136" class="notification"></p>',
	      [{
	        'redundantAttribute': 'expr131',
	        'selector': '[expr131]',

	        'expressions': [{
	          'type': expressionTypes.EVENT,
	          'name': 'oninput',

	          'evaluate': function(scope) {
	            return scope.handleChange;
	          }
	        }, {
	          'type': expressionTypes.VALUE,

	          'evaluate': function(scope) {
	            return scope.state.settings.value;
	          }
	        }]
	      }, {
	        'type': bindingTypes.IF,

	        'evaluate': function(scope) {
	          return scope.state.settings.value.length > 0;
	        },

	        'redundantAttribute': 'expr132',
	        'selector': '[expr132]',

	        'template': template(
	          '<svg expr133="expr133" name="renderElement"></svg><canvas expr134="expr134" name="renderElement"></canvas><img expr135="expr135" name="renderElement" alt="barcode"/>',
	          [{
	            'type': bindingTypes.IF,

	            'evaluate': function(scope) {
	              return scope.state.settings.renderer === 'svg';
	            },

	            'redundantAttribute': 'expr133',
	            'selector': '[expr133]',
	            'template': template(null, [])
	          }, {
	            'type': bindingTypes.IF,

	            'evaluate': function(scope) {
	              return scope.state.settings.renderer === 'canvas';
	            },

	            'redundantAttribute': 'expr134',
	            'selector': '[expr134]',
	            'template': template(null, [])
	          }, {
	            'type': bindingTypes.IF,

	            'evaluate': function(scope) {
	              return scope.state.settings.renderer === 'img';
	            },

	            'redundantAttribute': 'expr135',
	            'selector': '[expr135]',
	            'template': template(null, [])
	          }]
	        )
	      }, {
	        'type': bindingTypes.IF,

	        'evaluate': function(scope) {
	          return scope.state.settings.value.length === 0;
	        },

	        'redundantAttribute': 'expr136',
	        'selector': '[expr136]',
	        'template': template('\n    Please enter at least one character in your text.\n  ', [])
	      }]
	    );
	  },

	  'name': 'riot-barcode'
	};

	component(RiotBarcode)(document.getElementById("app"));

}());
