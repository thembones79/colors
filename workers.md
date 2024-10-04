

```
// worker.js

self.onmessage = function(e) {
    const { action, src } = e.data;

    if (action === 'loadScript' && src) {
        fetchScriptAndExecute(src);
    }
};

function fetchScriptAndExecute(src) {
    fetch(src)
        .then(response => response.text())
        .then(scriptText => {
            try {
                const blob = new Blob([scriptText], { type: 'application/javascript' });
                const url = URL.createObjectURL(blob);
                importScripts(url);
                self.postMessage(`Loaded script: ${src}`);
                URL.revokeObjectURL(url);
            } catch (error) {
                self.postMessage(`Failed to execute script: ${src}`);
            }
        })
        .catch(error => {
            self.postMessage(`Failed to fetch script: ${src}`);
        });
}

```




```
(function() {
    // List of heavy computation functions or third-party scripts
    const heavyComputationScripts = [
        'https://www.example.com/heavy-script1.js',
        'https://www.example.com/heavy-script2.js',
        'https://www.example.com/heavy-script3.js'
    ];

    const originalScript = document.createElement.bind(document);

    document.createElement = function(tagName) {
        const element = originalScript(tagName);

        if (tagName === 'script') {
            Object.defineProperty(element, 'src', {
                set(src) {
                    if (typeof src === 'string' && (isThirdPartyScript(src) || isHeavyComputationScript(src))) {
                        loadScriptViaWorker(src);
                    } else {
                        element.setAttribute('src', src);
                    }
                },
                get() {
                    return element.getAttribute('src');
                }
            });
        }

        return element;
    };

    function isThirdPartyScript(src) {
        const thirdPartyDomains = [
            'example1.com',
            'example2.com',
            'example3.com',
            'example4.com',
            'example5.com',
            'example6.com'
        ];
        return thirdPartyDomains.some(domain => src.includes(domain));
    }

    function isHeavyComputationScript(src) {
        return heavyComputationScripts.some(script => src.includes(script));
    }

    function loadScriptViaWorker(src) {
        if (window.Worker) {
            const worker = new Worker('/wp-content/themes/blocksy-child/js/worker.js');
            worker.postMessage({ action: 'loadScript', src: src });

            worker.onmessage = function(e) {
                console.log('Loaded script:', e.data);
            };

            worker.onerror = function(error) {
                console.error('Worker error:', error);
                // Fallback to direct loading if worker fails
                loadScriptDirectly(src);
            };
        } else {
            console.error('Web Workers are not supported in your browser.');
            // Fallback to direct loading if web workers are not supported
            loadScriptDirectly(src);
        }
    }

    function loadScriptDirectly(src) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    }
})();
```
