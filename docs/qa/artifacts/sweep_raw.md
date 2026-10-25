# sweep raw (2026-10-25)
--- catch{} / .catch(()=>{}) / @ts-ignore / eslint-disable (web+automation)
--- bare/broad except (python)
automation/scrapers/ngo_news_scraper.py:44:        except Exception as e:
automation/processors/db_writer.py:60:        except Exception as e:
--- silent-success shell/CI patterns
--- exit(0) / pass-through
automation/scrapers/base_scraper.py:29:        pass
src/outreach_gate.py:13:    pass
