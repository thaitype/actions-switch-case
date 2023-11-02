# Switch Case Actions

[![Continuous Integration](https://github.com/thaitype/actions-switch-case/actions/workflows/ci.yml/badge.svg)](https://github.com/thaitype/actions-switch-case/actions/workflows/ci.yml)
![](badges/coverage.svg)

A GitHub Action for easily returning one of many values based on multiple conditionals.

## Introduction
switch-case-action is a versatile GitHub Action that allows you to specify conditionals and their associated values in your workflow. You can use this action to handle a variety of scenarios where different actions or values need to be executed or returned based on specific conditions.

## Motivation
I've found switch-case-action to do a great job for switch actions and switch cases in GitHub Actions. However, it uses the `/true\s*=>\s*(.*)?$/m` regular expression, which doesn't support multi-line values. This limitation inspired the creation of this action to provide a more flexible and versatile solution for handling conditions and values in GitHub Actions workflows.

## Features
- Simple and easy-to-understand syntax for defining conditionals and their associated values.
- Supports both conditional expressions and default values.
- No need for complex scripting; just define your conditions and associated values in your workflow YAML.
Usage

## Basic Example
In this example, we define two conditionals and their associated values using the conditionals-with-values input. If any of the conditions evaluate to true, the corresponding value is returned.

```yaml
- name: Run switch-case-action
  uses: thaitype/actions-switch-case@v1
  id: switch-case
  with:
    default: "its the default"
    conditionals-with-values: |
      ${{ 'test' == 'not-test' }} => shouldnt be this one
      ${{ 'test' == 'test' }} => correctAnswer

- name: Echo the result
  run: echo ${{ steps.switch-case.outputs.match }} # Output: correctAnswer
```

In this case, the condition ${{ 'test' == 'test' }} evaluates to true, so correctAnswer is returned.

## Default Value
If none of the conditions match, you can specify a default value to be returned. In the following example, no conditions match, so the default value is returned.

```yaml
- name: Run switch-case-action
  uses: thaitype/actions-switch-case@v1
  id: switch-case
  with:
    default: "its the default"
    conditionals-with-values: |
      ${{ 'test' == 'not-test' }} => shouldnt be this one
      ${{ 'test' == 'still-not-test' }} => shouldnt be this one, too

- name: Echo the result
  run: echo ${{ steps.switch-case.outputs.match }} # Output: its the default
```

In this case, none of the conditions evaluate to true, so the default value "its the default" is returned.

## Input Explanation
default: The default value to return when none of the conditions match.

conditionals-with-values: This input allows you to define your conditionals and their associated values. Each conditional should follow the format:

- A conditional expression in ${{ }}.
- An arrow =>.
- The associated value.

Please note that conditionals are evaluated in order, and the first one to evaluate to true will determine the output value.

## Contribute
We welcome contributions to switch-case-action. If you have any ideas, feature requests, or bug reports, please feel free to open an issue or submit a pull request. Your feedback and contributions are highly appreciated!

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

