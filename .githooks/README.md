# pre-commit hook

## Local syntax check and code review

### Installation

Set path to the git hooks script directory at local repository on your workstation

```bash
#!/bin/bash
cd <RepoDir>
git config --local core.hooksPath .githooks
```

Check changes at git configuration

```bash
#!/bin/bash
git config --list --local |grep -i hooksPath
```

### Usage

Make commit and git will call this local pre-commit hook

```bash
#!/bin/bash
git commit -m "Local pre-commit hook check"
```

### Links

1. [githooks - Hooks used by Git](https://git-scm.com/docs/githooks "githooks - Hooks used by Git")
2. [Customizing Git - Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks "Customizing Git - Git Hooks")
3. [Super-Linter](https://github.com/marketplace/actions/super-linter "Super-Linter")
4. [How to Use GitHub Super Linter in Your Projects](https://www.freecodecamp.org/news/github-super-linter/ "How to Use GitHub Super Linter in Your Projects")
