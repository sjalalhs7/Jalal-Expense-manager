package com.jalal.expensemanager;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends Activity {
    private static final int PICK_BACKUP_FILE = 4101;
    private static final int SAVE_BACKUP_FILE = 4102;
    private WebView webView;
    private ValueCallback<Uri[]> fileCallback;
    private String pendingBackupJson;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);

        webView.addJavascriptInterface(new Object() {
            @JavascriptInterface public void saveBackup(String json) {
                runOnUiThread(() -> {
                    pendingBackupJson = json;
                    Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("application/json");
                    intent.putExtra(Intent.EXTRA_TITLE, "Jalal_Expense_Backup.json");
                    startActivityForResult(intent, SAVE_BACKUP_FILE);
                });
            }
        }, "AndroidBridge");

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient() {
            @Override public boolean onShowFileChooser(WebView view,
                    ValueCallback<Uri[]> callback, FileChooserParams params) {
                if (fileCallback != null) fileCallback.onReceiveValue(null);
                fileCallback = callback;
                Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("application/json");
                startActivityForResult(
                    Intent.createChooser(intent, "Select expense backup"),
                    PICK_BACKUP_FILE
                );
                return true;
            }
        });

        // Copy the repository's existing index.html into this exact assets path.
        webView.loadUrl("file:///android_asset/index.html");
    }

    @Override protected void onActivityResult(int requestCode, int resultCode, Intent result) {
        super.onActivityResult(requestCode, resultCode, result);
        if (requestCode == PICK_BACKUP_FILE) {
            if (fileCallback != null) {
                Uri[] uris = resultCode == RESULT_OK && result != null && result.getData() != null
                    ? new Uri[]{result.getData()} : null;
                fileCallback.onReceiveValue(uris);
                fileCallback = null;
            }
        } else if (requestCode == SAVE_BACKUP_FILE) {
            if (resultCode == RESULT_OK && result != null && result.getData() != null
                    && pendingBackupJson != null) {
                try (OutputStream out = getContentResolver().openOutputStream(result.getData())) {
                    if (out != null) {
                        out.write(pendingBackupJson.getBytes(StandardCharsets.UTF_8));
                        Toast.makeText(this, "Backup saved", Toast.LENGTH_LONG).show();
                    }
                } catch (Exception e) {
                    Toast.makeText(this, "Could not save backup", Toast.LENGTH_LONG).show();
                }
            }
            pendingBackupJson = null;
        }
    }

    @Override public void onBackPressed() {
        if (webView != null && webView.canGoBack()) webView.goBack();
        else super.onBackPressed();
    }
}
