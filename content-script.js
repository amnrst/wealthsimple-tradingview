
const container_id = "tradingview_e6201";

const tv_div = () =>
    `<div class="tradingview-widget-container">
        <div id="${container_id}" style="height: 500px"></div>
        <div class="tradingview-widget-copyright"></div>
    </div>`;

function run() {
    let symbol = "";
    setInterval(() => {
        if (window.location.href.indexOf("/app/trade/security/") == -1) return;

        const symbol_el = document.querySelector('span[font-size="f5"]');
        if (!symbol_el || symbol == symbol_el.textContent) return;

        let chart_el = document.querySelector('[data-cy="timeseries-chart"]');
        if (!chart_el) return;

        const exchange_el = document.querySelector('[data-qa="wstrade-info-item-Exchange"]')
        if (!exchange_el) return;

        chart_el = chart_el.parentElement.parentElement;
        symbol = symbol_el.textContent;
        exchange = exchange_el.textContent;
        exchange = exchange.replace('-', ''); // remove the - in TSX-V

        if (!document.querySelector(`#${container_id}`)) {
            chart_el.parentElement.insertAdjacentHTML(
                "afterend",
                tv_div()
            );
            chart_el.parentElement.style.display = "none";
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
            window.wsimple_tview && window.wsimple_tview.remove();
            window.wsimple_tview = new TradingView.widget(
                {
                    "autosize": true,
                    "symbol": "${exchange}:${symbol}",
                    "interval": "4H",
                    "timezone": "Etc/UTC",
                    "theme": "light",
                    "style": "1",
                    "fullscreen": true,
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "allow_symbol_change": false,
                    "container_id": "${container_id}"
                }
            );
        `;
        const last_script = document.getElementsByTagName("script")[0];
        last_script.parentNode.insertBefore(script, last_script);
    }, 1000);
}

// Add tradingview script
(function () {
    var po = document.createElement("script");
    po.type = "text/javascript";
    po.async = true;
    po.src = "https://s3.tradingview.com/tv.js";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(po, s);
    run();
})();
