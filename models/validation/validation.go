package validation

import (
	"reflect"
	"strconv"
	"strings"
)

func IsValidValue(rules []string, val interface{}) (bool, *[]string) {
	res := []string{}
	for i := 0; i < len(rules); i++ {
		ruleDef := rules[i]
		ruleParts := strings.Split(ruleDef, "(")
		ruleName := ruleParts[0]
		var ruleParams []string
		if len(ruleParts) == 2 {
			ruleParams = strings.Split(strings.TrimRight(ruleParts[1], ")"), ",")
		}
		switch {
		case ruleName == "minLength" && !HasMinLength(val.(string), ruleParams[0]):
			res = append(res, ruleName)
			break
		case ruleName == "maxLength" && !HasMaxLength(val.(string), ruleParams[0]):
			res = append(res, ruleName)
			break
		case ruleName == "biggerThan" && !BiggerThan(val.(int), ruleParams[0]):
			res = append(res, ruleName)
			break
		case ruleName == "smallerThan" && !SmallerThan(val.(int), ruleParams[0]):
			res = append(res, ruleName)
			break
		case ruleName == "nonZero" && !NonZero(val):
			res = append(res, ruleName)
			break
		}
	}
	return len(res) == 0, &res
}

func HasMinLength(val, length string) bool {
	minLen, _ := strconv.ParseInt(length, 10, 0)
	return int64(len(val)) >= minLen
}

func HasMaxLength(val, length string) bool {
	maxLen, _ := strconv.ParseInt(length, 10, 0)
	return int64(len(val)) <= maxLen
}

func BiggerThan(val int, minSize string) bool {
	min, _ := strconv.ParseInt(minSize, 10, 0)
	return int64(val) > min
}

func SmallerThan(val int, maxSize string) bool {
	max, _ := strconv.ParseInt(maxSize, 10, 0)
	return int64(val) < max
}

func NonZero(v interface{}) bool {
	st := reflect.ValueOf(v)
	valid := true
	switch st.Kind() {
	case reflect.String:
		valid = len(st.String()) != 0
	case reflect.Ptr, reflect.Interface:
		valid = !st.IsNil()
	case reflect.Slice, reflect.Map, reflect.Array:
		valid = st.Len() != 0
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		valid = st.Int() != 0
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64, reflect.Uintptr:
		valid = st.Uint() != 0
	case reflect.Float32, reflect.Float64:
		valid = st.Float() != 0
	case reflect.Bool:
		valid = st.Bool()
	case reflect.Invalid:
		valid = false // always invalid
	default:
		return true
	}
	return valid
}
