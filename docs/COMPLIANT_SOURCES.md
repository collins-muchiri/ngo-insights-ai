# Compliant source list for lead discovery

LinkedIn harvesting breaches LinkedIn's terms of service and, for personal data of identifiable
staff, data protection law in Kenya and the EU. For a consultancy whose stated competence includes
GDPR and Kenya Data Protection Act fluency, that contradiction is a commercial liability as well as
a legal one. This file replaces the source list.

## Permitted sources
1. National NGO registration registers and regulator listings, as published public records.
2. IATI publisher and activity data, open by design.
3. ReliefWeb organisation and vacancy listings, under their published terms.
4. Organisation websites' own public pages: about, team, annual reports, published vacancies.
5. Public job boards with permissive terms, cited per board.
6. Directly supplied lists from the client, under the client's own lawful basis.

## Prohibited sources
LinkedIn scraping or automated collection. Any source whose terms prohibit automated access. Any
purchased contact list. Any personal data of individuals not acting in a published organisational
capacity.

## Enforcement
apps ingestion reads only sources present in src/source_allowlist.py. Adding a source requires a
pull-request note citing its terms. See src/source_allowlist.py.
