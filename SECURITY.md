# Security Policy

## Scope

This public repository hosts GULOO.com website source and related public-facing assets. Do not disclose credentials, tokens, private keys, customer data, personnel data, banking information, internal-only commercial data, or other sensitive material in issues, pull requests, commits, discussions, or screenshots.

## Reporting a security issue

Do **not** open a public issue with exploit details, credentials, or sensitive evidence.

Report the issue through the approved private company security channel or repository security reporting mechanism available to authorized maintainers. Include only the minimum evidence required to reproduce and assess the issue.

## Secret exposure response

If a real secret is suspected or confirmed:
1. stop further propagation;
2. do not copy the secret into public comments or logs;
3. preserve non-secret evidence such as file path, commit/reference, secret type, and observed impact;
4. route credential revocation/rotation through the approved high-impact authorization path;
5. evaluate Git history remediation separately because destructive history rewriting requires explicit approval.

## Repository boundary

Public website repositories must contain only approved public material. Internal governance, finance, product master, Agent OS, customer, employee, credential, and operationally sensitive records should live in an approved private source of truth.
