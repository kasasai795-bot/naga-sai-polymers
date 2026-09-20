"use client";

import { useEffect, useState } from "react";
import {
  settingsService,
  Settings,
} from "@/services/settingsService";
import API_BASE_URL from "@/lib/api";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "",
    gstNumber: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    invoicePrefix: "",
    logo: "",

    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",

    panNumber: "",
    state: "",

    declaration: "",
    authorizedSign: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const data = await settingsService.getSettings();

      setSettings({
        companyName: data.companyName || "",
        gstNumber: data.gstNumber || "",
        address: data.address || "",
        phone: data.phone || "",
        email: data.email || "",
        website: data.website || "",
        invoicePrefix: data.invoicePrefix || "",
        logo: data.logo || "",

        bankName: data.bankName || "",
        accountNumber: data.accountNumber || "",
        ifscCode: data.ifscCode || "",
        branch: data.branch || "",

        panNumber: data.panNumber || "",
        state: data.state || "",

        declaration: data.declaration || "",
        authorizedSign: data.authorizedSign || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  async function uploadLogo(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `${API_BASE_URL}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();

      const API_ORIGIN = API_BASE_URL.replace(/\/api$/, "");

      setSettings({
        ...settings,
        logo: `${API_ORIGIN}${data.imageUrl}`,
      });

    } catch (err) {
      console.error(err);
      alert("Logo upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);

      await settingsService.updateSettings(settings);

      alert("Settings saved successfully.");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Company Settings
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Company Name"
          value={settings.companyName}
          onChange={(e) =>
            setSettings({
              ...settings,
              companyName: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="GST Number"
          value={settings.gstNumber}
          onChange={(e) =>
            setSettings({
              ...settings,
              gstNumber: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="PAN Number"
          value={settings.panNumber}
          onChange={(e) =>
            setSettings({
              ...settings,
              panNumber: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="State"
          value={settings.state}
          onChange={(e) =>
            setSettings({
              ...settings,
              state: e.target.value,
            })
          }
        />

        <textarea
          rows={3}
          className="border rounded-lg p-3 w-full"
          placeholder="Address"
          value={settings.address}
          onChange={(e) =>
            setSettings({
              ...settings,
              address: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Phone"
          value={settings.phone}
          onChange={(e) =>
            setSettings({
              ...settings,
              phone: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Email"
          value={settings.email}
          onChange={(e) =>
            setSettings({
              ...settings,
              email: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Website"
          value={settings.website}
          onChange={(e) =>
            setSettings({
              ...settings,
              website: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Invoice Prefix"
          value={settings.invoicePrefix}
          onChange={(e) =>
            setSettings({
              ...settings,
              invoicePrefix: e.target.value,
            })
          }
        />

        <hr />

        <h2 className="text-xl font-bold">
          Bank Details
        </h2>

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Bank Name"
          value={settings.bankName}
          onChange={(e) =>
            setSettings({
              ...settings,
              bankName: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Account Number"
          value={settings.accountNumber}
          onChange={(e) =>
            setSettings({
              ...settings,
              accountNumber: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="IFSC Code"
          value={settings.ifscCode}
          onChange={(e) =>
            setSettings({
              ...settings,
              ifscCode: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Branch"
          value={settings.branch}
          onChange={(e) =>
            setSettings({
              ...settings,
              branch: e.target.value,
            })
          }
        />

        <hr />

        <textarea
          rows={5}
          className="border rounded-lg p-3 w-full"
          placeholder="Declaration"
          value={settings.declaration}
          onChange={(e) =>
            setSettings({
              ...settings,
              declaration: e.target.value,
            })
          }
        />

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Authorized Signatory"
          value={settings.authorizedSign}
          onChange={(e) =>
            setSettings({
              ...settings,
              authorizedSign: e.target.value,
            })
          }
        />

        {/* Company Logo */}

        <div>

          <label className="font-semibold block mb-2">
            Company Logo
          </label>

          {settings.logo && (
            <img
              src={settings.logo}
              alt="Company Logo"
              className="w-32 h-32 object-contain border rounded-lg mb-4"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={uploadLogo}
          />

          {uploading && (
            <p className="text-blue-600 mt-2">
              Uploading...
            </p>
          )}

        </div>

        <button
          onClick={saveSettings}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

      </div>

    </div>
  );
}