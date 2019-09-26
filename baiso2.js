import bundles from './baiso2.bundles';
import products from './baiso2.products';

const TYPE_ONE_OF_PRODUCTS = 'oneOfProduct';
const TYPE_RANGE = 'range';

const isValueInRange = (value = 0, range) => {
  const min = range[0] < 0 ? Number.MIN_VALUE : range[0];
  const max = range[1] < 0 ? Number.MAX_VALUE : range[1];

  return value > min && value < max;
}

const isAnswerValueSatisfyOneOfProductType = (answer, productList = []) => {
  for(let i=0; i<productList.length; i++) {
    const productName = productList[i];
    const { rules } = products[productName];

    if(isAnswerSatisfyAllRules(answer, rules)) {
      return true;
    }
  }

  return false;
}

const isAnswerSatisfyRule = (answer, rule) => {
  const { type, value, field } = rule;
  const answerValue = answer[field];

  switch (type) {
    case TYPE_ONE_OF_PRODUCTS:
      return isAnswerValueSatisfyOneOfProductType(answer, value);

    case TYPE_RANGE:
      return isValueInRange(answerValue, value);

    default:
      return answerValue === value;
  }
}

const isAnswerSatisfyAllRules = (answer, rules) => {
  for(let i=0; i<rules.length; i++) {
   const rule = rules[i];
    if(!isAnswerSatisfyRule(answer, rule)) {
      return false;
    }
  }

  return true;
}

const getRecommendBundle = (answer) => {
  let maxBundleValue = 0;

  bundles.forEach((bundle) => {
    const { rules } = bundle;
    if(isAnswerSatisfyAllRules(answer, rules) && bundle.value > maxBundleValue) {
      maxBundleValue = bundle.value;
    }
  });

  return maxBundleValue;
}

const findModifyFailedReason = (answer) => {
  const failedReason = [];
  const allAnswerKeys = Object.keys(answer);
  const allProductsKeys = Object.keys(products);
  allAnswerKeys.forEach((answerKey) => {
    let isValid = false;
    for(let i=0; i<allProductsKeys.length; i++) {
      const productName = allProductsKeys[i];
      const { rules } = products[productName];
      rules.forEach((rule) => {
        const { field } = rule;
        if(field === answerKey && isAnswerSatisfyRule({ [answerKey]: answer[answerKey] }, rule)) {
          isValid = true;
        }
      });
    }

    if(!isValid) {
      failedReason.push(answerKey);
    }
  });

  return failedReason;
}

const addOrChangeProductInProductList = (productList, productName) => {
  let existed = false;
  const product = products[productName];

  productList.forEach((name, index) => {
    const currentProduct = products[name];

    if(currentProduct.type === product.type) {
      if(currentProduct.value < product.value) {
        productList[index] = productName;
      }
      existed = true;
    }
  })

  if(!existed) {
    productList.push(productName);
  }
};

const makesAppropriateBundle = (answer, bundle) => {
  const bundleProducts = [];

  const allProductsKeys = Object.keys(products);

  allProductsKeys.forEach((productName) => {
    const { rules } = products[productName];
    const productIndex = bundleProducts.findIndex((name) => name === productName);
    const isProductInBundle = productIndex >= 0;

    if(isAnswerSatisfyAllRules(answer, rules)) {
      addOrChangeProductInProductList(bundleProducts, productName);
    } else if(isProductInBundle) {
      bundleProducts.splice(productIndex, 1);
    }
  });

  if(bundleProducts.length > 0) {
    return {
      ...bundle,
      products: bundleProducts
    };
  }

  return {failedReason: findModifyFailedReason(answer)};
}

export {
  getRecommendBundle,
  makesAppropriateBundle
};
