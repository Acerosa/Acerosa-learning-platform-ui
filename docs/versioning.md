# Versioning

Package: `@learning-platform/ui`  
Canonical git remote: `https://github.com/Acerosa/-learning-platform-ui.git`

The GitHub repository name currently has a leading hyphen. The npm package name does **not**.

## Semver

UI versions are independent of Core and Content.

| Change | Bump |
| --- | --- |
| Compatible presentation addition | patch or minor |
| Contract/enumerations change hubs rely on | minor until 1.0, then major |
| Removed export or breaking prop rename | major |

## 0.1.0

First official release. Aligns with Core 0.2.0 presentation contracts. Does not replace Core DOM factories.

Record for this release after the tag exists:

| Field | Value |
| --- | --- |
| Package | `@learning-platform/ui@0.1.0` |
| Repository | `Acerosa/-learning-platform-ui` |
| Tag | `v0.1.0` |
| Source commit | recorded at tag time |

Hubs should pin the git tag in CI (`ref: v0.1.0`) even when installing through `file:../learning-platform-ui`.
