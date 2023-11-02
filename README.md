# Switch Case Actions

[![Continuous Integration](https://github.com/thaitype/actions-switch-case/actions/workflows/ci.yml/badge.svg)](https://github.com/thaitype/actions-switch-case/actions/workflows/ci.yml)
![](badges/coverage.svg)

## Motivation

I've found [switch-case-action](https://github.com/dkershner6/switch-case-action) do the great job for switch action for switch case in Github Actions, however, on the code using `/true\s*=>\s*(.*)?$/m` regex expression which not support multi line value.


This actions will reimplemented using TypeScript for doing that.


Example: 

```yml
    - uses: thaitype/actions-switch-case@v1
      id: switch-case
      with:
          default: "its the default"
          conditionals-with-values: |
          ${{ 'test' == 'not-test' }} => shouldnt be this one
          ${{ 'test' == 'still-not-test' }} => shouldnt be this one, too
        
    - run: echo ${{ steps.switch-case.outputs.value }} # its the default
```