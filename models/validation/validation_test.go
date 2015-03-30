package validation_test

import (
	"alpinetime/models/validation"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestValidateLength(t *testing.T) {
	valid, _ := validation.IsValidValue([]string{"minLength(10)"}, "1234567890")
	assert.True(t, valid)
	valid, _ = validation.IsValidValue([]string{"minLength(3)", "kereviz"}, "1234567890")
	assert.True(t, valid)
	valid, _ = validation.IsValidValue([]string{"minLength(11)"}, "1234567890")
	assert.False(t, valid)
	valid, _ = validation.IsValidValue([]string{"invalid!", "minLength(1)", "minLength(100)", "kereviz", "(oops)", "minLength(1)"}, "1234567890")
	assert.False(t, valid)
	valid, _ = validation.IsValidValue([]string{"maxLength(11)", "minLength(1)"}, "1234567890")
	assert.True(t, valid)
	valid, _ = validation.IsValidValue([]string{"maxLength(8)", "minLength(1)"}, "1234567890")
	assert.False(t, valid)
	valid, _ = validation.IsValidValue([]string{"maxLength(1,8)", "ok", "minLength(1)"}, "1234567890")
	assert.False(t, valid)
}

func TestValidateInt(t *testing.T) {
	valid, _ := validation.IsValidValue([]string{"biggerThan(10)"}, 1234567890)
	assert.True(t, valid)
	valid, _ = validation.IsValidValue([]string{"smallerThan(10)"}, 1234567890)
	assert.False(t, valid)
	valid, _ = validation.IsValidValue([]string{"biggerThan(10)", "smallerThan(13)"}, 12)
	assert.True(t, valid)
}

func TestValidateNonZero(t *testing.T) {
	valid, _ := validation.IsValidValue([]string{"nonZero"}, 1)
	assert.True(t, valid)
	valid, _ = validation.IsValidValue([]string{"nonZero"}, "0")
	assert.True(t, valid)
	valid, _ = validation.IsValidValue([]string{"nonZero"}, 0)
	assert.False(t, valid)
	valid, _ = validation.IsValidValue([]string{"nonZero"}, "")
	assert.False(t, valid)
}
