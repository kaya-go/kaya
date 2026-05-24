# Changelog

All notable changes to this project will be documented in this file.

## [0.4.6] - 2026-05-24

### <!-- 1 -->🐛 Bug Fixes

- *(desktop)* Grant dialog:allow-ask/allow-confirm for updater prompt ([b3b551e](https://github.com/kaya-go/kaya/commit/b3b551eaeeea8b0b458d69b272fc3663717b876d)) by @hadim

### 🙏 Contributors

- @hadim
- @github-actions[bot]

## [0.4.5] - 2026-05-24

### <!-- 1 -->🐛 Bug Fixes

- *(desktop)* Linux model download, glibc, F11 and audio diagnostics ([#106](https://github.com/kaya-go/kaya/issues/106)) by @hadim

- *(ci)* Use Node.js/npx for rsbuild in Ubuntu .deb/.rpm build ([d5c3796](https://github.com/kaya-go/kaya/commit/d5c37965c1820f525ef5a0d6d88d2b98dc9d18eb)) by @hadim

- *(ci)* Install libssl-dev for Linux .deb/.rpm build ([0224232](https://github.com/kaya-go/kaya/commit/0224232968cd62d13591f361a75468f36c3d96e1)) by @hadim

- *(ci)* Bump linux .deb/.rpm container to ubuntu 24.04 ([a52bd88](https://github.com/kaya-go/kaya/commit/a52bd88e47ae8377568ad5cd96ad491cf946420f)) by @hadim

- *(ci)* Add --force to tauri-cli install in .deb/.rpm build ([3ba8296](https://github.com/kaya-go/kaya/commit/3ba82962f0095675f0d64405ca231b8a1688cfdd)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ui)* Split BoardRecognitionDialog into per-section components ([#112](https://github.com/kaya-go/kaya/issues/112)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Repo-slim (phase 1 + phase 2 refactors) ([#107](https://github.com/kaya-go/kaya/issues/107)) by @hadim

- *(ci)* Bump actions/setup-node from 4 to 6 ([#109](https://github.com/kaya-go/kaya/issues/109)) by @dependabot[bot]

- Release v0.4.5 ([26fb88b](https://github.com/kaya-go/kaya/commit/26fb88b80d6d96fc310aa3b0a15ad9c30ad31a54)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot]

## [0.4.4] - 2026-05-05

### <!-- 0 -->🚀 Features

- *(ai)* Rework MCTS cancellation and extend visit presets ([4ba346d](https://github.com/kaya-go/kaya/commit/4ba346d5d3e0888786e9c1018b8eef7090c00a7f)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ai)* Unblock MCTS startup on desktop and clean up CoreML config ([14e2ed6](https://github.com/kaya-go/kaya/commit/14e2ed6eae91ae54c0e7508d3947ee4ed013a144)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ai)* Mcts-first architecture with auto-config and unified queue ([#105](https://github.com/kaya-go/kaya/issues/105)) by @hadim

- *(ai)* Unify search-depth controls in one popover ([d9cd176](https://github.com/kaya-go/kaya/commit/d9cd176bac6d3d19acdc602cfaceeebcc5ae7734)) by @hadim

- *(ai)* Use engine winrate, decouple full-game search depth ([fa3d818](https://github.com/kaya-go/kaya/commit/fa3d818d9084d98aa8353535b8eddc2edaa0e785)) by @hadim

### <!-- 3 -->📚 Documentation

- Split static reference (docs/) from evolution log (specs/) ([96381b7](https://github.com/kaya-go/kaya/commit/96381b78076e44cae5d419eebf489fccf4cad55e)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- *(ci)* Bump mozilla-actions/sccache-action from 0.0.9 to 0.0.10 ([#99](https://github.com/kaya-go/kaya/issues/99)) by @dependabot[bot]

- Release v0.4.4 ([6b58d7e](https://github.com/kaya-go/kaya/commit/6b58d7e2412b72741548b32a152176066fe89f3f)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot]

## [0.4.3] - 2026-04-25

### <!-- 0 -->🚀 Features

- *(ui)* Redesign MCTS search depth picker with chip-based UI ([ca9a7a7](https://github.com/kaya-go/kaya/commit/ca9a7a7c065e68ce51badac37dd9b21ee3677352)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ai-engine)* Populate per-move scores in desktop full-game analysis ([b6890ea](https://github.com/kaya-go/kaya/commit/b6890ea2630d9c6251805d177b74921c9d08f49b)) by @hadim

### <!-- 5 -->🎨 Styling

- *(ui)* Stack metric label below value in analysis bar ([4fc731b](https://github.com/kaya-go/kaya/commit/4fc731b90538a6d0bb33f904672391bae6f21786)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.4.3 ([b450e04](https://github.com/kaya-go/kaya/commit/b450e04b0924428d09e416eb6ac8395aed836c5f)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot]

## [0.4.2] - 2026-04-24

### <!-- 1 -->🐛 Bug Fixes

- *(ai-engine)* Encode komi as selfKomi in featurization ([9bb3b7f](https://github.com/kaya-go/kaya/commit/9bb3b7f5d69dc070a967f07a5cf61e8494e076f2)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.4.2 ([6a9200c](https://github.com/kaya-go/kaya/commit/6a9200c005b65031c713850c5188f4347a0cadaa)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.4.1] - 2026-04-13

### <!-- 0 -->🚀 Features

- *(ui)* Add PWA install prompt for Android and iOS ([87c0b8e](https://github.com/kaya-go/kaya/commit/87c0b8e4748d3b899d9ca91215a4668e107f1fcf)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(board-recognition)* Improve model loading cache and progress feedback ([01df3f5](https://github.com/kaya-go/kaya/commit/01df3f507bb664ccde75a145401db703b7d28454)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.4.1 ([bbc0985](https://github.com/kaya-go/kaya/commit/bbc0985850825c2a5f675b590555cebe7cca5fb5)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.4.0] - 2026-04-12

### <!-- 0 -->🚀 Features

- *(ui)* Redesign scoring panel with result-first layout and unified rendering ([aa08f61](https://github.com/kaya-go/kaya/commit/aa08f61c890996724a70be575acf6359129bbd9b)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Fix scoring mode rapid toggle and stale closure bugs ([79c17b8](https://github.com/kaya-go/kaya/commit/79c17b8c82272f1c1c291e0b3b29f05ce7c4bd63)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ui)* Clean up scoring panel dead code and optimize ([48ffdec](https://github.com/kaya-go/kaya/commit/48ffdecf9f7e26b09dd3d9f18c775d1603868387)) by @hadim

- *(ui)* Unify scoring system with Monte Carlo estimation ([5486064](https://github.com/kaya-go/kaya/commit/5486064d6066b1d7fc04a3dcdae057a8b96bcd3f)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Update softprops/action-gh-release from v2 to v3 ([5976bd7](https://github.com/kaya-go/kaya/commit/5976bd74fe13b9755228d15875a3124d8d00f937)) by @hadim

- *(ci)* Replace peaceiris/actions-gh-pages with native git commands ([3dbd267](https://github.com/kaya-go/kaya/commit/3dbd267911ab587c433c9899346f3cbc08c55ae3)) by @hadim

- *(desktop)* Bump Cargo.lock version to 0.3.12-dev ([9bfbdd3](https://github.com/kaya-go/kaya/commit/9bfbdd39bc057d9babbbb9f0b2c969886092bc8c)) by @hadim

- Release v0.4.0 ([bc7c70e](https://github.com/kaya-go/kaya/commit/bc7c70e216f7b6cc609354c31cfe6e75ac4f8e3e)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.11] - 2026-04-06

### <!-- 1 -->🐛 Bug Fixes

- *(board-recognition)* Use freeDimensionOverrides as fallback for ONNX session creation ([ec19f1a](https://github.com/kaya-go/kaya/commit/ec19f1a31e72100805d1764976ec8bd2d50f4d5a)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.3.11 ([8f2547c](https://github.com/kaya-go/kaya/commit/8f2547c45c015cf9b16ae04f69939d7c65ec2c0e)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.10] - 2026-04-05

### <!-- 1 -->🐛 Bug Fixes

- *(board-recognition)* Fallback graph optimization level for ONNX session creation ([d3e9f46](https://github.com/kaya-go/kaya/commit/d3e9f460d44d40e87f0bb19bb2af5c78f6fbf931)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.3.10 ([f972f58](https://github.com/kaya-go/kaya/commit/f972f58522aa62611e2c88986d667f94126b2d07)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot]

## [0.3.9] - 2026-04-01

### <!-- 0 -->🚀 Features

- *(board-recognition)* Bundle moku model for desktop with HF fallback ([e30cbce](https://github.com/kaya-go/kaya/commit/e30cbce5da54b610b72d7847847fa84eed3cee24)) by @hadim

- *(i18n)* Add HuggingFace link for pre-converted models in upload section ([318f39f](https://github.com/kaya-go/kaya/commit/318f39fc001236b5324307c0465874b9d3348d9a)) by @hadim

- *(board-recognition)* Add custom ONNX detection model upload ([170c163](https://github.com/kaya-go/kaya/commit/170c1637cdc7d80822e07be74d37aa8d91883086)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(board-recognition)* Surface detailed error reason when moku model fails to load ([1c28384](https://github.com/kaya-go/kaya/commit/1c283840ebca0eaf9cb9ec02839c9f1bf4ef0bf3)) by @hadim

- *(ui)* Show library panel by default for new users ([327a9a6](https://github.com/kaya-go/kaya/commit/327a9a61a09e45d2fd69ff974976cae596f2922a)) by @hadim

- *(board-recognition)* Preserve manual corners on size change, fix display bugs ([944911e](https://github.com/kaya-go/kaya/commit/944911ee6b1b45d787205546f271ce48148efa1b)) by @hadim

- *(ui)* Drop overlay not dismissing when dragging out of window ([78aaeea](https://github.com/kaya-go/kaya/commit/78aaeeae06c8a2c42d5df9330c8f015e24acdc97)) by @hadim

- *(ui)* Add aria-label to action bar buttons for accessibility ([76bc881](https://github.com/kaya-go/kaya/commit/76bc88169f228c03c48a8831e8b6d737cae2ddc8)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(board-recognition)* Deduplicate moku logging and cache helpers ([a67abde](https://github.com/kaya-go/kaya/commit/a67abdebf1910a73867362ec779c52d5f73a3616)) by @hadim

### <!-- 3 -->📚 Documentation

- Add console logs section to bug report template ([c77950e](https://github.com/kaya-go/kaya/commit/c77950e72b8ef177a855198af89570712d51652d)) by @hadim

### <!-- 4 -->⚡ Performance

- *(board-recognition)* Reuse worker singleton across dialog openings with 30min idle timeout ([a6d64ce](https://github.com/kaya-go/kaya/commit/a6d64ce6298610c02c2dcbebcbf3ac88589963c1)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- *(ci)* Bump android-actions/setup-android to v4 ([1e5d477](https://github.com/kaya-go/kaya/commit/1e5d4775a182f48b34e92729e6d54989765c796e)) by @hadim

- Release v0.3.9 ([76cc65c](https://github.com/kaya-go/kaya/commit/76cc65c7a1cd6fac70ad9b5e586148908b4199bd)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.8] - 2026-03-23

### <!-- 0 -->🚀 Features

- *(board-recognition)* Upgrade to moku-v3 model and fix threshold defaults ([e9571e9](https://github.com/kaya-go/kaya/commit/e9571e99b22e7584b5b4c06871967b0163e5c50b)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.3.8 ([fa2302c](https://github.com/kaya-go/kaya/commit/fa2302c8b01e38d142132f3af0910ab21f29a3c1)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.7] - 2026-03-15

### <!-- 0 -->🚀 Features

- *(board-recognition)* Upgrade moku model to v2 and add ETag-based cache invalidation ([0e8dbfc](https://github.com/kaya-go/kaya/commit/0e8dbfcae7b84b0333bf3a416e4878c1b5810773)) by @hadim

- *(board-recognition)* Add refilter optimization and sensitivity UX redesign ([e04ea05](https://github.com/kaya-go/kaya/commit/e04ea059fdeda4ab90119e55fe0d2e22b8224b01)) by @hadim

- *(ui)* Improve mobile board recognition UX and add scan/open buttons to landing page ([29d338d](https://github.com/kaya-go/kaya/commit/29d338de3abadcacc235adbef108a064442d2268)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(board-recognition)* Fix moku refilter ArrayBuffer detach and optimize slider performance ([bfd65d2](https://github.com/kaya-go/kaya/commit/bfd65d2f9c1e962b700250fba55ca65bb2edbe07)) by @hadim

- *(ui)* Fix board recognition overlay misalignment on small window heights ([0d2cbd3](https://github.com/kaya-go/kaya/commit/0d2cbd3c66c55aba30efe02a09ee4ca73f573af4)) by @hadim

- *(ui)* Use neutral colors for corners status indicators ([e9e7e88](https://github.com/kaya-go/kaya/commit/e9e7e88a2ede59bab99b6ca968f7f37a784b0d71)) by @hadim

- *(ui)* Mobile board recognition dialog with tabbed layout and performance fixes ([b7b0e86](https://github.com/kaya-go/kaya/commit/b7b0e86ef4e7dc05fa10321417078a3882993b23)) by @hadim

- *(ui)* Count setup nodes in move counter for board recognition scans ([f98bc07](https://github.com/kaya-go/kaya/commit/f98bc0705676dbeb43a6261eb2f830cbd6880c5a)) by @hadim

- *(i18n)* Shorten board recognition stepReview tab label for mobile ([11d4eae](https://github.com/kaya-go/kaya/commit/11d4eae3466a7e63e1a20dede07121c0230dd8e6)) by @hadim

- *(ui)* Use ScanOptionsModal on landing page for photo/camera choice ([4fb26c3](https://github.com/kaya-go/kaya/commit/4fb26c3112c93b676ef3382a35a048faec2a737e)) by @hadim

### <!-- 3 -->📚 Documentation

- Update documentation with audio system, moku v2, and corrected paths ([3ec034f](https://github.com/kaya-go/kaya/commit/3ec034f76f8f31f0cbca5dda09b9bc6df523447d)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- *(board-recognition)* Reduce moku console log verbosity ([6d93b06](https://github.com/kaya-go/kaya/commit/6d93b06992f3db9ef149f0bad837f70ff19ac4f2)) by @hadim

- Release v0.3.7 ([39b8529](https://github.com/kaya-go/kaya/commit/39b8529b26b847f88975a25c9170df24363a3db6)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.6] - 2026-03-14

### <!-- 0 -->🚀 Features

- *(board-recognition)* Improve moku corner detection and add debug button ([6c5b446](https://github.com/kaya-go/kaya/commit/6c5b446d762e87d60fbb97375d336f3908fc7b7c)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(android)* Add api-24 feature to ort and update ONNX Runtime to 1.24.3 ([55eaa82](https://github.com/kaya-go/kaya/commit/55eaa822257d95af888a52ba951a644943e43feb)) by @hadim

- *(audio)* Use lewton decoder instead of symphonia for OGG vorbis ([60d6e0b](https://github.com/kaya-go/kaya/commit/60d6e0b94b8b4e3abe5b759994c96a1aa41de2af)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Bump all patch and minor dependencies (npm + rust) ([e84be2b](https://github.com/kaya-go/kaya/commit/e84be2bee186fcbba5bfa18e005478c8f7267011)) by @hadim

- Bump react-resizable-panels v3 to v4 ([b2eb7b2](https://github.com/kaya-go/kaya/commit/b2eb7b26fb34bf3a0f5c1602e72e18269659e89c)) by @hadim

- Release v0.3.6 ([63d644d](https://github.com/kaya-go/kaya/commit/63d644d18b70b8ab398ac44830c889afaf014cfe)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.5] - 2026-03-13

### <!-- 0 -->🚀 Features

- *(ai)* Add MCTS live progress, heatmap metric toggle, next move display, and native Rust MCTS ([#84](https://github.com/kaya-go/kaya/issues/84)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Prevent analysis bar buttons from being clipped on narrow widths ([0061548](https://github.com/kaya-go/kaya/commit/0061548c1d8fb200cecb2a9c4673b14655083490)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.3.5 ([3d7d762](https://github.com/kaya-go/kaya/commit/3d7d7620d25c1a94488e572115ac6b763938fe2b)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.4] - 2026-03-10

### <!-- 0 -->🚀 Features

- *(ai-engine)* Automatic GPU→WASM fallback with warm-up validation ([b8e38de](https://github.com/kaya-go/kaya/commit/b8e38de9cc57d69788d25c230e38a784a61d68df)) by @hadim

- Native audio via rodio, bypass WebKitGTK/GStreamer ([a5668f3](https://github.com/kaya-go/kaya/commit/a5668f3ec208830d3ede490764b584fc9bbdd5d6)) by @hadim

- *(ui)* Add smart error recovery for AI engine initialization failures ([429d601](https://github.com/kaya-go/kaya/commit/429d601e9cac8581fe67a0589836b2a24fa6bfcc)) by @hadim

- *(ai)* Add precision consistency check and report both selected/runtime precision in logs ([7a4d36b](https://github.com/kaya-go/kaya/commit/7a4d36bb391d3151b6281cefe4839501740a18ac)) by @hadim

- *(ui)* Replace backend selector dropdown with card-based radio widget ([fe62acb](https://github.com/kaya-go/kaya/commit/fe62acb50bae3c3c549f83d300d3b8feae64ff8b)) by @hadim

- *(ui)* Add MCTS visits button, cache-aware re-analysis, and enable web backends on desktop ([cae8558](https://github.com/kaya-go/kaya/commit/cae8558299e8f122fef6bf89f74be8a1747ea35d)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(desktop)* Fix model download and ONNX Runtime on Linux ([73da560](https://github.com/kaya-go/kaya/commit/73da5605f42889709c4f994f43495966c04733e3)) by @hadim

- *(audio)* Switch from MP3 to OGG Vorbis for Linux compatibility ([9fdcdf8](https://github.com/kaya-go/kaya/commit/9fdcdf846f1acc4cf2c487093517ed218b5da6be)) by @hadim

- Add mobile stub for download_file command ([5434954](https://github.com/kaya-go/kaya/commit/54349546b13fca66148d5800a4718159b9a82ec4)) by @hadim

- *(ui)* Retry AudioContext resume with backoff instead of failing permanently ([0e5636b](https://github.com/kaya-go/kaya/commit/0e5636b6973d0393a4de6c3b5373685749cc90e1)) by @hadim

- *(ui)* Add HTMLAudioElement fallback when Web Audio API device fails ([c8bf1b6](https://github.com/kaya-go/kaya/commit/c8bf1b69fcad58c307a7aa5e2b531787daaf55e2)) by @hadim

- *(ui)* Prevent AudioContext.resume() from freezing AppImage ([82fdc1e](https://github.com/kaya-go/kaya/commit/82fdc1ed7b3f49f1e6d788381783397c72ee8a35)) by @hadim

- *(desktop)* Prevent audio freeze in AppImage by skipping WebAudio in Tauri ([7f0d90c](https://github.com/kaya-go/kaya/commit/7f0d90c6fb4dd0affa60e61966ef3f7c231ea139)) by @hadim

- *(desktop)* Disable WebKitGTK DMA-BUF renderer and GPU compositing on Linux ([175378a](https://github.com/kaya-go/kaya/commit/175378aa3945b590ca8c6674fad58151f2c2c988)) by @hadim

- *(ai-engine)* Detect WebGPU errors via error scopes and fallback to WASM ([80e0293](https://github.com/kaya-go/kaya/commit/80e029341a0d1c0d8d376ca0652873ae8e0492f0)) by @hadim

- *(ci)* Add ALSA deps and exclude rodio from Android builds ([6271603](https://github.com/kaya-go/kaya/commit/6271603afcd1feedaa49512930187cc2cf3c7197)) by @hadim

- *(ci)* Copy assets before android cargo check ([93eb6e7](https://github.com/kaya-go/kaya/commit/93eb6e714de57c3926f47a28ddadfe84f4eb18dd)) by @hadim

- *(ai-engine)* Add GPU→CPU fallback for native desktop ONNX engine ([6d17816](https://github.com/kaya-go/kaya/commit/6d17816add5e6b390403e862bf664ba9f1cd84f9)) by @hadim

- Allow dead_code on AudioState stub for Android builds ([a0533b2](https://github.com/kaya-go/kaya/commit/a0533b2e146be8955cd3827c50f6adfde885f453)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ai)* Centralize GPU fallback in AIEngineContext and fix backend switching ([7dc0c79](https://github.com/kaya-go/kaya/commit/7dc0c798a0c6f997f7d5796423dd7ad4b5549965)) by @hadim

- Split Rust modules and improve PyTorch GPU UI ([ce7472b](https://github.com/kaya-go/kaya/commit/ce7472be74bf2860f91fef8375d45a7038cc671e)) by @hadim

- *(ui)* Replace technical AI model jargon with user-friendly labels ([df645bd](https://github.com/kaya-go/kaya/commit/df645bd8473f29ceb0163bb6ff215ad42cd544a9)) by @hadim

- Remove GST_PLUGIN_SYSTEM_PATH workaround ([e1afba8](https://github.com/kaya-go/kaya/commit/e1afba8afc159fd4ff68ddcefcc31b518ec8f4b1)) by @hadim

### <!-- 3 -->📚 Documentation

- Add copy-assets troubleshooting to contributing guide ([42fde7b](https://github.com/kaya-go/kaya/commit/42fde7b2782498eb259e04aff89520b81955aa7e)) by @hadim

- Update documentation with missing features, fix stale i18n paths ([ec815bb](https://github.com/kaya-go/kaya/commit/ec815bb51050c5726646b2e6e4a1ea588a826742)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.3.4 ([936d91a](https://github.com/kaya-go/kaya/commit/936d91a728dd0e9485e12ddd1242d1deb59dbc78)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.3] - 2026-03-10

### <!-- 1 -->🐛 Bug Fixes

- *(ci)* Switch linux build to arch container for appimage compatibility ([9734119](https://github.com/kaya-go/kaya/commit/9734119b604055cb008c236e6ae31d43e8c00af3)) by @hadim

- *(ci)* Add clang and cmake to linux build dependencies ([f6396d4](https://github.com/kaya-go/kaya/commit/f6396d491dafb649f38654765ffc368e323ada3f)) by @hadim

- *(ci)* Install mold linker in linux build container ([5ddfb4d](https://github.com/kaya-go/kaya/commit/5ddfb4db26e0657c974fc8fd35b78f58317113f7)) by @hadim

- *(ci)* Add missing dependencies for quick-sharun AppImage bundler ([28218e6](https://github.com/kaya-go/kaya/commit/28218e61b4c6a28e186becb98e5098da2b5ae63f)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(board-recognition)* Restructure dialog, add import modes, and optimize worker ([64fc031](https://github.com/kaya-go/kaya/commit/64fc031197aa2c39d3c05dfec49df510b1c1c64f)) by @hadim

- *(ci)* Split desktop builds into reusable per-platform workflows ([9efa301](https://github.com/kaya-go/kaya/commit/9efa301f1e6ff17489daf817d4c6d1f3a64bf243)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.3.3 ([64bf74e](https://github.com/kaya-go/kaya/commit/64bf74eeac8d021f595bd9f594a51865711f4828)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.2] - 2026-03-08

### <!-- 0 -->🚀 Features

- *(ui)* Hide action button text when board panel is narrow using container query ([5922fd0](https://github.com/kaya-go/kaya/commit/5922fd091422a4645965cb1c7d5cc889dcd5df32)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- Add macOS camera entitlement for board scanning ([7169527](https://github.com/kaya-go/kaya/commit/716952720555d882dd62f7d1e9ac206fb02cd7a1)) by @hadim

- *(ui)* Keep keyboard and wheel navigation active when board controls are collapsed ([79ce8ea](https://github.com/kaya-go/kaya/commit/79ce8ea7a74d1877b8eded2c6dbf82a74d7acb4f)) by @hadim

### <!-- 3 -->📚 Documentation

- Improve README branding with board recognition screenshot ([c3ea8dd](https://github.com/kaya-go/kaya/commit/c3ea8dd47616901c49a495fd5b4b4cdfbc4cf526)) by @hadim

- Update branding across tauri, html meta tags, manifest, and package.json ([2687ee0](https://github.com/kaya-go/kaya/commit/2687ee019f7c41597fd418eceb01dc27478214bd)) by @hadim

- Update og image and fix manifest dimensions ([6a976e0](https://github.com/kaya-go/kaya/commit/6a976e082dca4ef7c96e51ba6952e2ad060d9d2a)) by @hadim

- Update app name and description in manifest.json ([5e16d4f](https://github.com/kaya-go/kaya/commit/5e16d4f45e9bba4eb2c67c3c3efc28df7262f5e3)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Improve release notes (exclude bots, remove installation section) ([d667ea0](https://github.com/kaya-go/kaya/commit/d667ea019e17a0df3e7f0745297f4bb71d4f4e74)) by @hadim

- Release v0.3.2 ([1712c0f](https://github.com/kaya-go/kaya/commit/1712c0fb9a6976c50fb374ca3401c3a12cadcb7d)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.3.1] - 2026-03-08

### <!-- 1 -->🐛 Bug Fixes

- *(rust)* Enforce zero warnings and fix all unused code warnings ([2f69c71](https://github.com/kaya-go/kaya/commit/2f69c7115ed513df110c40ad21859281166ca646)) by @hadim

- *(ui)* Keep theme/sound toggles visible on mobile header and maximize board width ([657a8c4](https://github.com/kaya-go/kaya/commit/657a8c45e0e50d6e1e7412074babcb9370e68165)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Switch domain to kayago.app ([020923e](https://github.com/kaya-go/kaya/commit/020923e76891a605c8de1657dfa12b64be1f2090)) by @hadim

- Release v0.3.1 ([fa34b72](https://github.com/kaya-go/kaya/commit/fa34b7200196f4e8bc9411b6e34ece05bb94a798)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot]

## [0.3.0] - 2026-03-02

### <!-- 0 -->🚀 Features

- Ai inference improvements, board recognition, CPU usage fixes, and new backends ([#50](https://github.com/kaya-go/kaya/issues/50)) by @Aitai

- *(board-recognition)* Add moku AI detection backend with RT-DETR ([#67](https://github.com/kaya-go/kaya/issues/67)) by @hadim

- *(board-recognition)* Enhance Moku AI detector with caching, progress tracking, and optimized pipeline ([#68](https://github.com/kaya-go/kaya/issues/68)) by @hadim

- *(ui)* Add overflow menu system and scan board option ([#72](https://github.com/kaya-go/kaya/issues/72)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ci)* Use new tauri appimage format for linux builds ([c37b221](https://github.com/kaya-go/kaya/commit/c37b221a619febf75f080b23b54ded86406551fa)) by @hadim

- *(nightly)* Add --force to cargo install tauri-cli on Linux ([#49](https://github.com/kaya-go/kaya/issues/49)) by @Copilot

- Align dependabot labels with existing repo label convention ([#53](https://github.com/kaya-go/kaya/issues/53)) by @Copilot

- Update ort API calls for 2.0.0-rc.11 compatibility ([#62](https://github.com/kaya-go/kaya/issues/62)) by @Copilot

- Call .commit() on ort::init() to fix Android CI compilation ([#65](https://github.com/kaya-go/kaya/issues/65)) by @Copilot

- Switch macOS build from universal to aarch64-apple-darwin ([#73](https://github.com/kaya-go/kaya/issues/73)) by @Copilot

### <!-- 2 -->🚜 Refactor

- Reduce file sizes across the codebase for improved maintainability ([#71](https://github.com/kaya-go/kaya/issues/71)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- *(ci)* Bump actions/setup-java from 4 to 5 ([#45](https://github.com/kaya-go/kaya/issues/45)) by @dependabot[bot]

- Exclude cla-signatures.json from prettier check ([#52](https://github.com/kaya-go/kaya/issues/52)) by @Copilot

- *(ci)* Bump actions/download-artifact from 7 to 8 ([#55](https://github.com/kaya-go/kaya/issues/55)) by @dependabot[bot]

- *(ci)* Bump actions/upload-artifact from 6 to 7 ([#54](https://github.com/kaya-go/kaya/issues/54)) by @dependabot[bot]

- Update ort to 2.0.0-rc.11 ([#60](https://github.com/kaya-go/kaya/issues/60)) by @Copilot

- Skip PR title check for draft PRs ([#63](https://github.com/kaya-go/kaya/issues/63)) by @Copilot

- Skip CLA and welcome message for copilot bot PRs ([#64](https://github.com/kaya-go/kaya/issues/64)) by @Copilot

- Fix release Linux build failing on cargo install tauri-cli ([#74](https://github.com/kaya-go/kaya/issues/74)) by @Copilot

- Release v0.3.0 ([2f842a9](https://github.com/kaya-go/kaya/commit/2f842a9c0eb9a29d80f8d8c3496a29b7611fe441)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @Copilot *(first contribution)* 🎉
- @hadim
- @dependabot[bot]
- @Aitai *(first contribution)* 🎉

## [0.2.4] - 2026-01-03

### <!-- 0 -->🚀 Features

- *(android)* Add android compilation support with ONNX Runtime NNAPI ([06a068c](https://github.com/kaya-go/kaya/commit/06a068c7e68afeeed772661b68bf30e1267b31a7)) by @hadim

- *(ai-engine)* Add game performance report system ([94063a1](https://github.com/kaya-go/kaya/commit/94063a12346600819e2e9f58299a19c22d0db0cd)) by @hadim

- *(ui)* Add performance report with rank+probability classification ([da91646](https://github.com/kaya-go/kaya/commit/da91646f00194a1872789879adc86913e70bd8a5)) by @hadim

- *(ui)* Improve next move marker visibility and add keyboard shortcut ([b714776](https://github.com/kaya-go/kaya/commit/b714776d53e33f01e2175847d602b27075dd8a27)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(clipboard)* Use injected tauri API for desktop clipboard ([c1ec858](https://github.com/kaya-go/kaya/commit/c1ec858e1fdd00ddc92f3bc18bb85bf9664bb42f)) by @hadim

### <!-- 6 -->🧪 Testing

- Add e2e tests for desktop app ([f7ccfe9](https://github.com/kaya-go/kaya/commit/f7ccfe9df22448c55340265d9f325e5da55b488c)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Exclude GitHub Actions bot from contributors list ([556bb51](https://github.com/kaya-go/kaya/commit/556bb51b7845fcacf84f5fa81ebc10bb63af36bb)) by @hadim

- Release v0.2.4 ([8f88b67](https://github.com/kaya-go/kaya/commit/8f88b67d19ebfc7fe9bd9f3bd3599e3e947c870f)) by @github-actions[bot]

### 🙏 Contributors

- @hadim
- @github-actions[bot]

## [0.2.3] - 2026-01-02

### <!-- 0 -->🚀 Features

- *(ui)* Add keyboard shortcuts for top moves, ownership, and settings ([36cd245](https://github.com/kaya-go/kaya/commit/36cd2453d00e6fdb6080b1a0586d1d1f134b9230)) by @hadim

- *(ui)* Add collapsible board controls section ([4de5561](https://github.com/kaya-go/kaya/commit/4de5561020ea36cb82ec989d39e902579c931946)) by @hadim

- *(ui)* Add configurable keyboard shortcuts with settings tab ([d8e107b](https://github.com/kaya-go/kaya/commit/d8e107bd5c42df07abb3e13fbea936140343aa8b)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Allow actions bar buttons to wrap to second line on narrow widths ([a1f1693](https://github.com/kaya-go/kaya/commit/a1f16939354a11fb82e511b89bb5e49a5bb1b075)) by @hadim

- Scale app icon to fill more of the canvas on macos ([38d1d42](https://github.com/kaya-go/kaya/commit/38d1d4219cb81e16cdbfefa84dfa144e50da7208)) by @hadim

- *(desktop)* Resolve native TauriEngine import for desktop app ([d652a73](https://github.com/kaya-go/kaya/commit/d652a739f75c585a7571021302c72b4652c3d2b0)) by @hadim

### <!-- 3 -->📚 Documentation

- Update documentation with new features and fixes ([b35294c](https://github.com/kaya-go/kaya/commit/b35294ccaf1349f3972e0ad3b1d7651051357a8a)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.2.3 ([94de82f](https://github.com/kaya-go/kaya/commit/94de82fa3c815a3a7e2314054d864674f405f5ca)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.2.2] - 2026-01-01

### <!-- 0 -->🚀 Features

- Add contributors section to changelog generation ([1a9cea8](https://github.com/kaya-go/kaya/commit/1a9cea89d61ba93779f2fdbc0f432d3b39557265)) by @hadim

- *(ui)* Add board theme system with configurable stone styles ([#36](https://github.com/kaya-go/kaya/issues/36)) by @hadim

- *(ui)* Rename suggest move button to suggest ([0eb4153](https://github.com/kaya-go/kaya/commit/0eb415360521748b72617b7aa280cc8437e1fca2)) by @hadim

- *(ui)* Add toggle to show/hide board coordinates ([cd121be](https://github.com/kaya-go/kaya/commit/cd121bee555670b4939a78e7938cda4f8f7cf6be)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- Update first-interaction action input names to v3 format ([8e2663d](https://github.com/kaya-go/kaya/commit/8e2663df1df2e12357e7ef8040b49de72e6b6ff6)) by @hadim

- Use pull_request_target for labeler workflow ([d701bd1](https://github.com/kaya-go/kaya/commit/d701bd14286b7b4bf40def20805147b1bf6e8154)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- *(ci)* Bump dessant/lock-threads from 5 to 6 ([#30](https://github.com/kaya-go/kaya/issues/30)) by @dependabot[bot]

- *(ci)* Bump actions/upload-artifact from 4 to 6 ([#31](https://github.com/kaya-go/kaya/issues/31)) by @dependabot[bot]

- *(ci)* Bump actions/download-artifact from 4 to 7 ([#32](https://github.com/kaya-go/kaya/issues/32)) by @dependabot[bot]

- *(ci)* Bump actions/cache from 4 to 5 ([#33](https://github.com/kaya-go/kaya/issues/33)) by @dependabot[bot]

- Release v0.2.2 ([4c9114c](https://github.com/kaya-go/kaya/commit/4c9114c910899c355f288f12591615c7fae03fa5)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot]

## [0.2.1] - 2025-12-31

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.2.1 ([011d40a](https://github.com/kaya-go/kaya/commit/011d40a5d45d53e35c9b12523c29d59c14640578)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.2.0] - 2025-12-31

### <!-- 0 -->🚀 Features

- *(ui)* Enable undo/redo keyboard shortcuts globally ([dfbb57d](https://github.com/kaya-go/kaya/commit/dfbb57da0e66525d6ce5aefa74623ba18a1b853a)) by @hadim

- *(ui)* Add subtle outlines to game tree stones for better visibility ([9e7c784](https://github.com/kaya-go/kaya/commit/9e7c78429d7a5d3ac889fa3cfbd29ad33328978e)) by @hadim

- *(ui)* Add drag-to-paint and toggle markers for edit tools ([016abf6](https://github.com/kaya-go/kaya/commit/016abf6f4985adf26116c679fa0e13d5a6ce5873)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- Pin linuxdeploy version for Linux AppImage EGL fix ([26c6984](https://github.com/kaya-go/kaya/commit/26c69842c33e038e0c70e0b1186058e4c595d359)) by @hadim

- *(ci)* Add linux appimage EGL fix to release workflow ([346c4bc](https://github.com/kaya-go/kaya/commit/346c4bcd61236f7c4557a42d4854437c671f5ad5)) by @hadim

- *(ui)* Only process left-click for drag-to-paint markers ([7715d9d](https://github.com/kaya-go/kaya/commit/7715d9d942f2c05f752bd4571aa73f737ce286ec)) by @hadim

### <!-- 6 -->🧪 Testing

- *(e2e)* Add gameplay and edit tools tests ([45c4834](https://github.com/kaya-go/kaya/commit/45c48340271c3f6e75e937f01eb5594fd6b5dc27)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Ignore ONNX Runtime WASM files copied from node_modules ([002e44c](https://github.com/kaya-go/kaya/commit/002e44ce99f1871f178cd048b9585960b2e42c6b)) by @hadim

- Release v0.2.0 ([924be08](https://github.com/kaya-go/kaya/commit/924be080aca6c37b6302e9e43e9350be15f24847)) by @github-actions[bot]

### 🙏 Contributors

- @hadim
- @github-actions[bot]

## [0.1.12] - 2025-12-30

### <!-- 0 -->🚀 Features

- *(desktop)* Add about metadata with description and github link ([bef3344](https://github.com/kaya-go/kaya/commit/bef3344e465211652826e18b04fd6f9fad29ea61)) by @hadim

- *(desktop)* Add custom about dialog with version info and github links ([bffb2b7](https://github.com/kaya-go/kaya/commit/bffb2b7df9c8e4e652ef1583698e858b835f20f5)) by @hadim

- *(ui)* Add About dialog accessible from footer and menu ([1f2d1c6](https://github.com/kaya-go/kaya/commit/1f2d1c622a4b361a448e2ef1441dd7e047417e72)) by @hadim

- *(web)* Add PWA support for installable web app ([5deb058](https://github.com/kaya-go/kaya/commit/5deb058acc346bdd96d864ddc37e795546994250)) by @hadim

- *(ui)* Require model download before enabling analysis mode ([993f6f7](https://github.com/kaya-go/kaya/commit/993f6f79b2aac473a5280a34be5f39261067ea3d)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(desktop)* Remove empty File menu on Linux/Windows ([f605944](https://github.com/kaya-go/kaya/commit/f6059446ab194f7b04c01e9ba1b3ba170ca821fd)) by @hadim

- *(ci)* Read version from package.json instead of gitignored version.json ([f2f6349](https://github.com/kaya-go/kaya/commit/f2f6349c6983da2f039139c3ce2d1b740a0baa82)) by @hadim

- *(ci)* Add tauri signing keys to nightly builds ([3486723](https://github.com/kaya-go/kaya/commit/3486723a97ca9755d3caa9e8697fb9c9367fd7c8)) by @hadim

- *(ci)* Use numeric date suffix for nightly version (MSI compatibility) ([6c4df53](https://github.com/kaya-go/kaya/commit/6c4df5387329f46a063411ce7d2b009da3630732)) by @hadim

- *(ci)* Skip msi build for nightly, use nsis exe only ([7e20b15](https://github.com/kaya-go/kaya/commit/7e20b15227270a25674466389561ba8f151393a6)) by @hadim

- *(ci)* Use standard version from package.json for nightly builds ([a267adb](https://github.com/kaya-go/kaya/commit/a267adb0200b9d9f657e1432d648ff2a930a43cc)) by @hadim

- *(web)* Disable google analytics on localhost ([3b45a4d](https://github.com/kaya-go/kaya/commit/3b45a4d5533e6a2b9d14050b0769ab40996ee012)) by @hadim

- *(desktop)* Rename help menu to about on linux/windows ([ffba96a](https://github.com/kaya-go/kaya/commit/ffba96a11f7b48429abbb395400f26e62dc0b6de)) by @hadim

- *(desktop)* Fix about dialog icon path and add icon to public ([93854d1](https://github.com/kaya-go/kaya/commit/93854d18bb18181fff6d02ccf923d826469cfc55)) by @hadim

- *(desktop)* Update analytics page_location to match GA4 data stream URL ([b95056b](https://github.com/kaya-go/kaya/commit/b95056b7ff45d27ef2ac35b4065a00cd0065e29a)) by @hadim

- *(web)* Resolve service worker reload conflict causing black screen ([f2c6b7e](https://github.com/kaya-go/kaya/commit/f2c6b7ef504269de6208f42441b2a502897afa09)) by @hadim

### <!-- 3 -->📚 Documentation

- Clarify git commit behavior in agent rules ([3e3b23c](https://github.com/kaya-go/kaya/commit/3e3b23c5feb66d1363fe8476285a2b5cebbb0c10)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Add nightly build workflow for linux, macos, and windows ([0aa460e](https://github.com/kaya-go/kaya/commit/0aa460e86a3ef9c85aa4472e1341eb6a3776e08e)) by @hadim

- Remove msi build, use nsis exe only for windows ([9e131c1](https://github.com/kaya-go/kaya/commit/9e131c1549df99e8335eca713c3d6220a821bd96)) by @hadim

- Release v0.1.12 ([38c6ad5](https://github.com/kaya-go/kaya/commit/38c6ad595ab7254c98e2613286f3cae96ab81828)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.11] - 2025-12-29

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Fix comment editing not working with shared context ([dfcbb02](https://github.com/kaya-go/kaya/commit/dfcbb02c8dfc5f1459ad20bfeea203bc10079fbb)) by @hadim

- *(desktop)* Downgrade ndarray to 0.16 to match ort crate ([d10fac4](https://github.com/kaya-go/kaya/commit/d10fac44a09c4a99742a6b1952085c142be18a69)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(e2e)* Split tests into separate files by feature ([da9a8fe](https://github.com/kaya-go/kaya/commit/da9a8fe98aebd1cf9ec8f89a929d8ac6773f486b)) by @hadim

- *(scripts)* Add tauri:check script for rust compilation check ([b22b09e](https://github.com/kaya-go/kaya/commit/b22b09efa7335def6c8d470664b57b5d646811a2)) by @hadim

### <!-- 6 -->🧪 Testing

- Add unit tests and e2e tests with playwright ([a2b0c50](https://github.com/kaya-go/kaya/commit/a2b0c50a85c25e7835f57c8ec8e2e0c4ff9b91a8)) by @hadim

- *(e2e)* Add comment editing tests ([7749b9f](https://github.com/kaya-go/kaya/commit/7749b9fb973e7cd846e5171635e7e1bfee63a996)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- *(ci)* Add github automation workflows and policies ([2ae303e](https://github.com/kaya-go/kaya/commit/2ae303ed87e84270f7896359385dea518528c959)) by @hadim

- Remove optional scope validation from PR title check ([e3b6a27](https://github.com/kaya-go/kaya/commit/e3b6a27eedab7a2e2f48cb0dfef7e95f2e815385)) by @hadim

- Remove unnecessary newline in PR title check workflow ([3e81d2d](https://github.com/kaya-go/kaya/commit/3e81d2dc2a09a8f96dc71568f9f7b875e9f75528)) by @hadim

- *(ci)* Bump actions/labeler from 5 to 6 ([#16](https://github.com/kaya-go/kaya/issues/16)) by @dependabot[bot]

- *(ci)* Bump actions/checkout from 4 to 6 ([#18](https://github.com/kaya-go/kaya/issues/18)) by @dependabot[bot]

- *(ci)* Bump github/codeql-action from 3 to 4 ([#17](https://github.com/kaya-go/kaya/issues/17)) by @dependabot[bot]

- *(ci)* Bump actions/first-interaction from 1 to 3 ([#19](https://github.com/kaya-go/kaya/issues/19)) by @dependabot[bot]

- *(ci)* Bump mozilla-actions/sccache-action from 0.0.6 to 0.0.9 ([#21](https://github.com/kaya-go/kaya/issues/21)) by @dependabot[bot]

- *(ci)* Bump actions/stale from 9 to 10 ([#20](https://github.com/kaya-go/kaya/issues/20)) by @dependabot[bot]

- Remove CodeQL security analysis workflow ([12ddf53](https://github.com/kaya-go/kaya/commit/12ddf530ee379315169cc44296137db857e36dbc)) by @hadim

- Add rust/tauri compilation check to PR builds ([772bb0a](https://github.com/kaya-go/kaya/commit/772bb0a875cb2e51f214c3d940b224cef13b6ef9)) by @hadim

- Release v0.1.11 ([53a81ad](https://github.com/kaya-go/kaya/commit/53a81ad1d3a6e98387afeb61b250fe0f9d817bc8)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @dependabot[bot] *(first contribution)* 🎉

## [0.1.10] - 2025-12-29

### <!-- 0 -->🚀 Features

- Add macOS code signing and notarization ([c554c02](https://github.com/kaya-go/kaya/commit/c554c0283882075ec0b08216d1fdbaf62946a650)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ui)* Redesign analysis panel toolbar layout ([b048998](https://github.com/kaya-go/kaya/commit/b04899812ecb5583580916b7acca095ea1e1a715)) by @hadim

### <!-- 3 -->📚 Documentation

- Remove xattr workaround instructions now that dmg is signed ([f8c20aa](https://github.com/kaya-go/kaya/commit/f8c20aabe7b8f9f32066dacf67c58de4d49dd390)) by @hadim

- Update issue template links in readme ([36c5c22](https://github.com/kaya-go/kaya/commit/36c5c22b429fc272c8bc31316404e78818947422)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Add rpm to release artifacts and downloads table ([1b58a0d](https://github.com/kaya-go/kaya/commit/1b58a0d9119b22b438030147baa540a6695b35c6)) by @hadim

- Add PR title validation for conventional commits ([464eefa](https://github.com/kaya-go/kaya/commit/464eefa66c2d2e152659b10928e37dc64caffffd)) by @hadim

- Release v0.1.10 ([6f2d5be](https://github.com/kaya-go/kaya/commit/6f2d5be0cc0e7e873f597d65aaee6a81f5d1e093)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @ludflu

## [0.1.9] - 2025-12-28

### <!-- 0 -->🚀 Features

- *(ui)* Add translations and keyboard shortcut for suggest move button ([b0e85ba](https://github.com/kaya-go/kaya/commit/b0e85badec2adf4a5117be71eb59c09792b90e6f)) by @hadim

- *(ui)* Auto-trigger suggest move after engine initialization ([562ff50](https://github.com/kaya-go/kaya/commit/562ff50a07db194d59810b80fc4f989dfbf0572b)) by @hadim

- *(ui)* Add analysis mode indicator with toggle logic ([c5f26ca](https://github.com/kaya-go/kaya/commit/c5f26ca4cf9a6a459db481d3802c8f8d02aafbfe)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Play sound when AI suggests a move ([c8c01fa](https://github.com/kaya-go/kaya/commit/c8c01fa0986e6278102d41836942dec7c2869c1f)) by @hadim

- *(ui)* Lower status bar hide breakpoint from 1440px to 1024px ([6f1075b](https://github.com/kaya-go/kaya/commit/6f1075b893f953dc9e20529d298f526c2e5d9409)) by @hadim

- *(desktop)* Strip html comments from changelog in updater ([de0fcd1](https://github.com/kaya-go/kaya/commit/de0fcd1a0f78bdeb90ef448cdc7100001ff76fe3)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ui)* Separate AI engine lifecycle from analysis context ([663ee20](https://github.com/kaya-go/kaya/commit/663ee205842b6048b791b8b08d80bbbdb0b3447f)) by @hadim

- *(ui)* Use createEngine factory to remove Tauri engine duplication ([737f5fb](https://github.com/kaya-go/kaya/commit/737f5fb7aec1d11f5c6ea6f96d1e3dcab4d948f4)) by @hadim

### <!-- 3 -->📚 Documentation

- *(ui)* Add comments clarifying move generation vs analysis separation ([b0dc8ef](https://github.com/kaya-go/kaya/commit/b0dc8ef6a4d8686d197362c5e464accf055e4ed5)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.9 ([4a9bf86](https://github.com/kaya-go/kaya/commit/4a9bf865cdb0747ff03e9f1973d11f6384bce59e)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim
- @ludflu *(first contribution)* 🎉

## [0.1.8] - 2025-12-28

### <!-- 0 -->🚀 Features

- *(ui)* Add unified KayaConfig modal with tabs and fuzzy stone placement toggle ([5569982](https://github.com/kaya-go/kaya/commit/55699820c269a72566337bdc9be8142533b143b4)) by @hadim

- *(ui)* Add explanation for custom model upload feature ([97904b4](https://github.com/kaya-go/kaya/commit/97904b40c481b471bcd8892318822022dc432673)) by @hadim

- *(ui)* Improve AI config UX with get started banner and KataGo attribution ([d794960](https://github.com/kaya-go/kaya/commit/d794960575ddd6c397af4b9f4978db7d6aaffc4f)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Prevent toggle switch from inheriting tablet min-height ([ef64e0c](https://github.com/kaya-go/kaya/commit/ef64e0cbf46e7aae4aebd9bb843db79e6cdb7573)) by @hadim

- *(linux)* Improve appimage compatibility by building on ubuntu-22.04 ([e13c7f2](https://github.com/kaya-go/kaya/commit/e13c7f257cbd4a119f370eab86a605bf688580fb)) by @hadim

- *(release)* Update platform condition to use ubuntu-22.04 for dependencies and build ([e32d2a5](https://github.com/kaya-go/kaya/commit/e32d2a58b38cc68208023691c2c58b0f09c73bb0)) by @hadim

- Remove unsupported bundleXdgOpen config option ([0eed66a](https://github.com/kaya-go/kaya/commit/0eed66a961c39606e20136eec5525e696fbf3184)) by @hadim

- *(i18n)* Upgrade react-i18next to v16.5.0 and fix language switching ([c10f95f](https://github.com/kaya-go/kaya/commit/c10f95f9f8051174211bfd072e6730acd0d98ba1)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ui)* Rename settings to analysis options in AI config ([5656f0e](https://github.com/kaya-go/kaya/commit/5656f0e51a52336c35d8fdd312f3038f934377a2)) by @hadim

### <!-- 3 -->📚 Documentation

- Add github release download count badge ([2090486](https://github.com/kaya-go/kaya/commit/2090486b70384b8c6581a0557f988a86d4d69a02)) by @hadim

- *(i18n)* Clarify that only .onnx models are supported for custom upload ([f66f13e](https://github.com/kaya-go/kaya/commit/f66f13eca1d12f0d40c82d4ca82daf9d7ed90157)) by @hadim

- Add contributing guide with setup instructions ([b19113c](https://github.com/kaya-go/kaya/commit/b19113c33c5dfba83f878240f43bddabd48018da)) by @hadim

- Add issue and pull request templates ([bc355b8](https://github.com/kaya-go/kaya/commit/bc355b839792ff67501e0258a5dc65644d931f1c)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Add stale bot to close inactive issues and PRs ([a5584c1](https://github.com/kaya-go/kaya/commit/a5584c13bc4cf48278043971aad2f2231ca5f0f0)) by @hadim

- Release v0.1.8 ([b253e76](https://github.com/kaya-go/kaya/commit/b253e7660f577b7c2432a5b5ea52773f1f635cd1)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.7] - 2025-12-28

### <!-- 0 -->🚀 Features

- *(ui)* Show analysis panel by default ([fa82ea3](https://github.com/kaya-go/kaya/commit/fa82ea3704b5c20edd3d766c823a36ff14a76b16)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(ui)* Fix light mode styling for various UI components ([c3984a5](https://github.com/kaya-go/kaya/commit/c3984a5fec08ee07c5d50687af82e7de5c0ec935)) by @hadim

- Edit toolbar layout and scroll behavior at 1440px width ([725eff9](https://github.com/kaya-go/kaya/commit/725eff9d50b4318a45610e62ae113990ac895528)) by @hadim

- *(ui)* Add padding to win rate y-axis limits in analysis chart ([95f2775](https://github.com/kaya-go/kaya/commit/95f277547664fd85b1fa0da2d6259c45611df4eb)) by @hadim

- *(ui)* Increase bottom padding for x-axis labels in analysis chart ([3b0228f](https://github.com/kaya-go/kaya/commit/3b0228fda4d28db1c30a225bc3545e6c1a913959)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Add CLA assistant workflow and contributor license agreement ([50dee15](https://github.com/kaya-go/kaya/commit/50dee152e2e0fe778eb55c3bc73723e637f910c3)) by @hadim

- Release v0.1.7 ([0def89d](https://github.com/kaya-go/kaya/commit/0def89d4db7814951bbaba5cc795cd0f6acfc97e)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.6] - 2025-12-27

### <!-- 0 -->🚀 Features

- *(desktop)* Improve updater UI with dev mode testing and better styling ([644f04e](https://github.com/kaya-go/kaya/commit/644f04e6031b1807c6698cce48a8bbe3eeedfbfc)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.6 ([075b95d](https://github.com/kaya-go/kaya/commit/075b95d7c801f7003d0ffe25077389411fa51ef1)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.5] - 2025-12-27

### <!-- 0 -->🚀 Features

- *(ai)* Hierarchical model selector with quantization options ([38ca0ed](https://github.com/kaya-go/kaya/commit/38ca0ed2a3797889c8d8f87b3273b9a4349449cd)) by @hadim

- *(ai)* Add smart backend fallback with settings persistence ([57c4c8c](https://github.com/kaya-go/kaya/commit/57c4c8ce422a9dd2c2c4e4f80f718c233322b0f7)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- Delete cached model from tauri filesystem when model is deleted ([829f7cc](https://github.com/kaya-go/kaya/commit/829f7ccf9c749c75f52e01cae57364ac3c5e99bb)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ai)* Simplify model definitions with url generation helper ([dc3743c](https://github.com/kaya-go/kaya/commit/dc3743c0f8b0aa331fee29a896e7b3f19bcfe0aa)) by @hadim

- *(ai)* Improve expand/collapse handling in AIAnalysisConfig ([fd258c6](https://github.com/kaya-go/kaya/commit/fd258c6d5029d568cdb39392a557f59014769d91)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.5 ([61b078f](https://github.com/kaya-go/kaya/commit/61b078f8e401b3f82ce4fe5ec9a3e30ce00f87ee)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.4] - 2025-12-27

### <!-- 0 -->🚀 Features

- *(ai)* Pin katago models to specific hugging face commit hash ([47ff9bc](https://github.com/kaya-go/kaya/commit/47ff9bc144d68bd083e01f3df52c4e1f7bc6fc30)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.4 ([9e7fb1d](https://github.com/kaya-go/kaya/commit/9e7fb1d2adbf4643897d5b8c33189ba8cc854fa6)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.3] - 2025-12-16

### <!-- 0 -->🚀 Features

- *(ui)* Create new game on paste with game name as filename ([8be79df](https://github.com/kaya-go/kaya/commit/8be79df1cbec73d609142bfe0faeacbb346d9ff8)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(desktop)* Use tauri clipboard plugin to avoid paste permission popup ([15de470](https://github.com/kaya-go/kaya/commit/15de4709ef802f3e81c1cb6eea311a0c497ccccf)) by @hadim

- Preserve analysis cache when loading SGF with embedded analysis ([9af0088](https://github.com/kaya-go/kaya/commit/9af0088874345c2492d7a92969a33936d59afd19)) by @hadim

- *(ai-engine)* Always display black win rate in analysis bar ([1bff38f](https://github.com/kaya-go/kaya/commit/1bff38f8ce7317f1ce670605960e7bce1ed783a7)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.3 ([6376203](https://github.com/kaya-go/kaya/commit/63762035e74558f656e79731f9fb48af49340484)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.2] - 2025-12-14

### <!-- 0 -->🚀 Features

- Migrate model hosting from GitHub to Hugging Face ([13fa7e7](https://github.com/kaya-go/kaya/commit/13fa7e731b747462b15c9c91ae4ee467baff3077)) by @hadim

- *(ai)* Add latest KataGo model and improve model library UX ([c1cf500](https://github.com/kaya-go/kaya/commit/c1cf5005709893f1b23c583b327baea8e237b678)) by @hadim

- *(ai)* Add recommended and default badges to first model ([6d8d935](https://github.com/kaya-go/kaya/commit/6d8d935d38839318f7da514dc9c369ec8be6bab1)) by @hadim

### <!-- 2 -->🚜 Refactor

- *(ai)* Use neutral model descriptions with 4 variants ([ed3f591](https://github.com/kaya-go/kaya/commit/ed3f591dfecbb2b4baf778f3b1743afefa3848d7)) by @hadim

- *(ai)* Format recommended badge rendering and improve default model selection logic ([a818916](https://github.com/kaya-go/kaya/commit/a8189161d72d3f982a1505fc45a3f0ce396d5cd7)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.2 ([c44393b](https://github.com/kaya-go/kaya/commit/c44393b85ecc337627bfa9cf3c7eb41615f65eb3)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.1] - 2025-12-13

### <!-- 0 -->🚀 Features

- *(desktop)* Add landing page and home button for mobile/tablet layout ([83a76f3](https://github.com/kaya-go/kaya/commit/83a76f35f6e00d3ced09593cd5426a56069dbf39)) by @hadim

### <!-- 1 -->🐛 Bug Fixes

- *(i18n)* Wait for translations to load before showing updater text ([2c19515](https://github.com/kaya-go/kaya/commit/2c195158dfdef000a0169fe746e23ca4bd284ceb)) by @hadim

- *(i18n)* Add missing translation keys for landing, editToolbar, and scoring ([e5bb31f](https://github.com/kaya-go/kaya/commit/e5bb31fe2e70f1ce8e61a3f76cb71edf28c45d12)) by @hadim

- Landing page library button now opens library tab on mobile ([376a415](https://github.com/kaya-go/kaya/commit/376a415354d996892d3f6ce6ae11f597ee8caa94)) by @hadim

- *(i18n)* Rename 'Configuration IA' to 'Configuration de l'analyse' in french ([d14e04c](https://github.com/kaya-go/kaya/commit/d14e04c18857c1b475b22c00de3731d3d6e1f3c9)) by @hadim

### <!-- 3 -->📚 Documentation

- Add screenshot to readme ([befd978](https://github.com/kaya-go/kaya/commit/befd978b112d5a92cf9cb6317bb29e7a20573979)) by @hadim

- Add multi-language and mobile/tablet support to features ([de4d3ac](https://github.com/kaya-go/kaya/commit/de4d3ac98a737c0d091c4f4831f1edc60ac0a401)) by @hadim

- Add release badge and tech stack badges with logos ([4f0f7a5](https://github.com/kaya-go/kaya/commit/4f0f7a5b8c1ce772eb158047c417d1f23c468a99)) by @hadim

- Replace text links with styled action buttons ([e3fdb65](https://github.com/kaya-go/kaya/commit/e3fdb65db6736eccd6c63289660ce6c72b022376)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Release v0.1.1 ([3eb79dd](https://github.com/kaya-go/kaya/commit/3eb79ddd1b082ebbd114dcfe11bcb6f69e71cb24)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot]
- @hadim

## [0.1.0] - 2025-12-13

### <!-- 1 -->🐛 Bug Fixes

- Disable debug info stripping for release builds ([635fd32](https://github.com/kaya-go/kaya/commit/635fd3253415765a4b6bc0b88ffe0daa1ad7a8fc)) by @hadim

### <!-- 7 -->⚙️ Miscellaneous Tasks

- Initial commit ([97a2457](https://github.com/kaya-go/kaya/commit/97a245746ac87df64284a9d6e31c35b3e3f0ba5e)) by @hadim

- Release v0.1.0 ([aacf98c](https://github.com/kaya-go/kaya/commit/aacf98cccb32cf78f2557fd51de6ee0f90fd0bd0)) by @github-actions[bot]

### 🙏 Contributors

- @github-actions[bot] *(first contribution)* 🎉
- @hadim *(first contribution)* 🎉

<!-- generated by git-cliff -->
