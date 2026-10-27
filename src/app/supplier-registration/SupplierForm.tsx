"use client";

import {
  ChangeEvent,
  FormEvent,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

type CommodityName =
  | ""
  | "kunyit"
  | "laos"
  | "temulawak"
  | "jahe-emprit"
  | "cengkeh"
  | "kluwek";

type CertificationName =
  | "halal"
  | "organic"
  | "gmp"
  | "haccp"
  | "lainnya"
  | "belum-ada";

type CommodityItem = {
  id: number;
  commodity: CommodityName;
  productForm: string;
  certifications: CertificationName[];
  otherCertification: string;
};

type StepOneData = {
  supplierName: string;
  businessName: string;
  whatsapp: string;
  email: string;
  supplierType: string;
};

type CheckResponse = {
  success?: boolean;
  allowed?: boolean;
  whatsapp?: string;
  message?: string;
};

type SubmitResponse = {
  success?: boolean;
  message?: string;
  supplierId?: string;
  submissionNo?: number;
};

type PreparedMedia = {
  mediaType?:
    | "productPhoto"
    | "stockPhoto"
    | "productVideo";
  mimeType?: string;
  fileSize?: number;
  fileName?: string;
  uploadUrl?: string;
};

type PreparedProduct = {
  productNumber?: number;
  media?: PreparedMedia[];
};

type PrepareResponse = {
  success?: boolean;
  message?: string;
  registrationToken?: string;
  products?: PreparedProduct[];
};


type SupplierFormProps = {
  maxCommodities: number;
};

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

const MAX_VIDEO_FILE_SIZE =
  30 * 1024 * 1024;

const MIN_SPECIFICATION_WORDS = 2;

const productFormOptions: Partial<
  Record<
    Exclude<CommodityName, "">,
    {
      value: string;
      label: string;
    }[]
  >
> = {
  kunyit: [
    {
      value: "segar",
      label: "Segar / Fresh",
    },
    // {
    //   value: "iris-kering",
    //   label: "Iris Kering / Dried Sliced",
    // },
  ],
  laos: [
    {
      value: "segar",
      label: "Segar / Fresh",
    },
    // {
    //   value: "iris-kering",
    //   label: "Iris Kering / Dried Sliced",
    // },
  ],
};

function createCommodity(
  id: number
): CommodityItem {
  return {
    id,
    commodity: "",
    productForm: "",
    certifications: [],
    otherCertification: "",
  };
}

/* ========================================
   HELPERS
======================================== */

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatThousands(
  value: string
) {
  const digits =
    onlyDigits(value);

  if (!digits) {
    return "";
  }

  const normalized =
    digits.replace(
      /^0+(?=\d)/,
      ""
    );

  return normalized.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );
}

function countWords(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length;
}

function normalizeText(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ");
}

async function uploadPreparedFile(
  file: File,
  uploadUrl: string
) {
  const CHUNK_SIZE =
    4 * 1024 * 1024;

  let start = 0;

  while (
    start <
    file.size
  ) {
    const endExclusive =
      Math.min(
        start + CHUNK_SIZE,
        file.size
      );

    const end =
      endExclusive - 1;

    const chunk =
      file.slice(
        start,
        endExclusive
      );

    const uploadResponse =
      await fetch(
        "/api/supplier-registration/upload",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/octet-stream",

            "x-upload-url":
              uploadUrl,

            "x-file-type":
              file.type,

            "x-file-size":
              String(
                file.size
              ),

            "x-chunk-start":
              String(start),

            "x-chunk-end":
              String(end),
          },

          body:
            chunk,
        }
      );

    const uploadData =
      (await uploadResponse.json()) as {
        success?: boolean;
        complete?: boolean;
        message?: string;
      };

    if (
      !uploadResponse.ok ||
      uploadData.success !==
        true
    ) {
      throw new Error(
        uploadData.message ||
          `Upload ${file.name} ke penyimpanan gagal.`
      );
    }

    const isFinalChunk =
      endExclusive ===
      file.size;

    if (
      isFinalChunk &&
      uploadData.complete !==
        true
    ) {
      throw new Error(
        `Upload ${file.name} belum selesai.`
      );
    }

    if (
      !isFinalChunk &&
      uploadData.complete ===
        true
    ) {
      throw new Error(
        `Upload ${file.name} selesai sebelum seluruh file terkirim.`
      );
    }

    start =
      endExclusive;
  }
}

/* ========================================
   COMPONENT
======================================== */

export default function SupplierForm({
  maxCommodities,
}: SupplierFormProps) {
  const router = useRouter();

  const safeMaxCommodities =
    Math.max(
      1,
      Math.min(
        maxCommodities,
        5
      )
    );

  const formRef =
    useRef<HTMLFormElement | null>(
      null
    );

  /* ========================================
     STEP 1 STATE
  ======================================== */

  const [
    stepOneData,
    setStepOneData,
  ] = useState<StepOneData>({
    supplierName: "",
    businessName: "",
    whatsapp: "",
    email: "",
    supplierType: "",
  });

  const [
    stepOnePassed,
    setStepOnePassed,
  ] = useState(false);

  const [
    stepOneError,
    setStepOneError,
  ] = useState("");

  const [
    whatsappNotice,
    setWhatsappNotice,
  ] = useState("");

  const [
    isCheckingStepOne,
    setIsCheckingStepOne,
  ] = useState(false);

  /* ========================================
     FORM STATE
  ======================================== */

  const [
    formError,
    setFormError,
  ] = useState("");

  const [
    productError,
    setProductError,
  ] = useState("");

  const [
    fileErrors,
    setFileErrors,
  ] = useState<
    Record<string, string>
  >({});

  const [
    showConfirmation,
    setShowConfirmation,
  ] = useState(false);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    honeypot,
    setHoneypot,
  ] = useState("");

  const [
    commodities,
    setCommodities,
  ] = useState<CommodityItem[]>([
    createCommodity(1),
  ]);

  /* ========================================
     DOM HELPERS
  ======================================== */

  const scrollToElement = (
    element: HTMLElement | null
  ) => {
    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      if (
        element instanceof
          HTMLInputElement ||
        element instanceof
          HTMLSelectElement ||
        element instanceof
          HTMLTextAreaElement
      ) {
        element.focus();
      }
    }, 350);
  };

  const setFieldError = (
    field:
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement,
    message: string
  ) => {
    field.setCustomValidity(
      message
    );

    field.reportValidity();

    scrollToElement(field);

    window.setTimeout(() => {
      field.setCustomValidity("");
    }, 150);
  };

  const getStepOneFields = () => {
    if (!formRef.current) {
      return [];
    }

    const fieldNames = [
      "supplierName",
      "whatsapp",
      "email",
      "supplierType",
    ];

    return fieldNames
      .map((name) =>
        formRef.current?.elements.namedItem(
          name
        )
      )
      .filter(
        (
          field
        ): field is
          | HTMLInputElement
          | HTMLSelectElement =>
          field instanceof
            HTMLInputElement ||
          field instanceof
            HTMLSelectElement
      );
  };

  const getFullWhatsApp = () => {
    return `62${onlyDigits(
      stepOneData.whatsapp
    )}`;
  };

  const findDuplicateProductIndex = (
    items: CommodityItem[]
  ) => {
    const seen =
      new Map<string, number>();

    for (
      let index = 0;
      index < items.length;
      index += 1
    ) {
      const item =
        items[index];

      if (
        !item ||
        !item.commodity ||
        !item.productForm
      ) {
        continue;
      }

      const key =
        `${item.commodity}:${item.productForm}`;

      if (seen.has(key)) {
        return index;
      }

      seen.set(key, index);
    }

    return -1;
  };

  /* ========================================
     STEP 1 VALIDATION
  ======================================== */

  const validateStepOne = () => {
    const fields =
      getStepOneFields();

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity();

        setStepOneError(
          "Mohon lengkapi Informasi Supplier dengan benar sebelum melanjutkan."
        );

        scrollToElement(field);

        return false;
      }
    }

    const nameField =
      formRef.current?.elements.namedItem(
        "supplierName"
      );

    if (
      nameField instanceof
      HTMLInputElement
    ) {
      const name =
        normalizeText(
          stepOneData.supplierName
        );

      if (
        name.length < 2 ||
        name.length > 150
      ) {
        setStepOneError(
          "Nama lengkap belum sesuai."
        );

        setFieldError(
          nameField,
          "Masukkan nama lengkap yang valid."
        );

        return false;
      }
    }

    const whatsappField =
      formRef.current?.elements.namedItem(
        "whatsapp"
      );

    if (
      whatsappField instanceof
      HTMLInputElement
    ) {
      const fullNumber =
        getFullWhatsApp();

      if (
        !/^628[0-9]{7,11}$/.test(
          fullNumber
        )
      ) {
        setStepOneError(
          "Nomor WhatsApp belum sesuai. Masukkan nomor setelah +62, contohnya 81234567890."
        );

        scrollToElement(
          whatsappField
        );

        return false;
      }
    }

    setStepOneError("");

    return true;
  };

  /* ========================================
     STEP 1 INPUT
  ======================================== */

  const handleStepOneInputChange = (
    event: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
    >
  ) => {
    const { name, value } =
      event.target;

    setStepOneData(
      (current) => ({
        ...current,
        [name]: value,
      })
    );

    setStepOneError("");
  };

  /* ========================================
     WHATSAPP
  ======================================== */

  const handleWhatsAppChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    let digits =
      onlyDigits(
        event.target.value
      );

    let notice = "";

    if (
      digits.startsWith("62")
    ) {
      digits =
        digits.slice(2);

      notice =
        "Kode negara +62 sudah tersedia. Anda cukup memasukkan nomor mulai dari 8.";
    } else if (
      digits.startsWith("0")
    ) {
      digits =
        digits.slice(1);

      notice =
        "Angka 0 di awal tidak diperlukan karena kode negara +62 sudah tersedia.";
    }

    digits =
      digits.slice(0, 12);

    setStepOneData(
      (current) => ({
        ...current,
        whatsapp: digits,
      })
    );

    setWhatsappNotice(notice);
    setStepOneError("");
  };

  /* ========================================
     STEP 1 CHECK
  ======================================== */

  const handleStepOneContinue =
    async () => {
      const valid =
        validateStepOne();

      if (
        !valid ||
        !formRef.current
      ) {
        return;
      }

      const whatsapp =
        getFullWhatsApp();

      setIsCheckingStepOne(
        true
      );

      setStepOneError("");

      try {
        const response =
          await fetch(
            "/api/supplier-registration/check",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                whatsapp,
              }),
            }
          );

        let data: CheckResponse;

        try {
          data =
            (await response.json()) as CheckResponse;
        } catch {
          throw new Error(
            "Server memberikan respons yang tidak valid."
          );
        }

        if (
          !response.ok ||
          !data.success ||
          !data.allowed
        ) {
          setStepOnePassed(
            false
          );

          setStepOneError(
            data.message ||
              "Informasi supplier belum dapat dilanjutkan."
          );

          return;
        }

        const normalized =
          data.whatsapp ??
          whatsapp;

        let subscriberNumber =
          normalized.replace(
            /\D/g,
            ""
          );

        if (
          subscriberNumber.startsWith(
            "62"
          )
        ) {
          subscriberNumber =
            subscriberNumber.slice(
              2
            );
        }

        setStepOneData(
          (current) => ({
            ...current,
            whatsapp:
              subscriberNumber,
          })
        );

        setStepOnePassed(true);
        setStepOneError("");
        setWhatsappNotice("");

        window.setTimeout(
          () => {
            document
              .getElementById(
                "supplier-location-section"
              )
              ?.scrollIntoView({
                behavior:
                  "smooth",
                block: "start",
              });
          },
          100
        );
      } catch (error) {
        setStepOnePassed(
          false
        );

        setStepOneError(
          error instanceof Error
            ? error.message
            : "Tidak dapat memeriksa pendaftaran saat ini. Silakan coba kembali."
        );
      } finally {
        setIsCheckingStepOne(
          false
        );
      }
    };

  const handleEditStepOne =
    () => {
      setStepOnePassed(false);
      setShowConfirmation(false);
      setFormError("");
      setStepOneError("");

      window.setTimeout(
        () => {
          document
            .getElementById(
              "supplier-information-section"
            )
            ?.scrollIntoView({
              behavior:
                "smooth",
              block: "start",
            });
        },
        100
      );
    };

  /* ========================================
     COMMODITY
  ======================================== */

  const handleCommodityChange = (
    id: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value =
      event.target
        .value as CommodityName;

    setCommodities(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  commodity:
                    value,
                  productForm:
                    "",
                }
              : item
        )
    );

    setProductError("");
    setFormError("");
  };

  const handleProductFormChange = (
    id: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const value =
      event.target.value;

    const currentItem =
      commodities.find(
        (item) =>
          item.id === id
      );

    if (!currentItem) {
      return;
    }

    const duplicate =
      commodities.some(
        (item) =>
          item.id !== id &&
          item.commodity ===
            currentItem.commodity &&
          item.productForm ===
            value
      );

    if (duplicate) {
      setProductError(
        "Produk dengan komoditas dan bentuk yang sama sudah ditambahkan sebelumnya."
      );

      setFormError("");

      event.target.setCustomValidity(
        "Pilih bentuk produk yang berbeda."
      );

      event.target.reportValidity();

      window.setTimeout(() => {
        event.target.setCustomValidity("");
      }, 150);

      return;
    }

    setCommodities(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  productForm:
                    value,
                }
              : item
        )
    );

    setProductError("");
    setFormError("");
  };

  /* ========================================
     CERTIFICATIONS
  ======================================== */

  const handleCertificationChange = (
    id: number,
    certification: CertificationName,
    checked: boolean
  ) => {
    setCommodities(
      (current) =>
        current.map(
          (item) => {
            if (
              item.id !== id
            ) {
              return item;
            }

            if (
              certification ===
              "belum-ada"
            ) {
              return {
                ...item,
                certifications:
                  checked
                    ? [
                        "belum-ada",
                      ]
                    : [],
                otherCertification:
                  "",
              };
            }

            let nextCertifications =
              item.certifications.filter(
                (
                  certificationName
                ) =>
                  certificationName !==
                  "belum-ada"
              );

            if (checked) {
              nextCertifications =
                [
                  ...nextCertifications,
                  certification,
                ];
            } else {
              nextCertifications =
                nextCertifications.filter(
                  (
                    certificationName
                  ) =>
                    certificationName !==
                    certification
                );
            }

            return {
              ...item,
              certifications:
                nextCertifications,
              otherCertification:
                certification ===
                  "lainnya" &&
                !checked
                  ? ""
                  : item.otherCertification,
            };
          }
        )
    );
  };

  const handleOtherCertificationChange = (
    id: number,
    value: string
  ) => {
    setCommodities(
      (current) =>
        current.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  otherCertification:
                    value,
                }
              : item
        )
    );
  };

  /* ========================================
     NUMBER INPUT
  ======================================== */

  const handleFormattedNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    event.target.value =
      formatThousands(
        event.target.value
      );
  };

  /* ========================================
     FILE VALIDATION
  ======================================== */

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const input =
      event.target;

    const file =
      input.files?.[0];

    setFileErrors(
      (current) => {
        const next = {
          ...current,
        };

        delete next[
          input.id
        ];

        return next;
      }
    );

    if (!file) {
      return;
    }

    const allowedTypes =
      new Set([
        "image/jpeg",
        "image/png",
        "image/webp",
      ]);

    if (
      !allowedTypes.has(
        file.type
      )
    ) {
      input.value = "";

      setFileErrors(
        (current) => ({
          ...current,
          [input.id]:
            "Format foto harus JPG, JPEG, PNG, atau WEBP.",
        })
      );

      return;
    }

    if (
      file.size <= 0
    ) {
      input.value = "";

      setFileErrors(
        (current) => ({
          ...current,
          [input.id]:
            "File foto tidak valid atau kosong.",
        })
      );

      return;
    }

    if (
      file.size >
      MAX_FILE_SIZE
    ) {
      input.value = "";

      setFileErrors(
        (current) => ({
          ...current,
          [input.id]:
            "Ukuran foto maksimal 5 MB.",
        })
      );
    }
  };

  const handleVideoChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const input =
      event.target;

    const file =
      input.files?.[0];

    setFileErrors(
      (current) => {
        const next = {
          ...current,
        };

        delete next[
          input.id
        ];

        return next;
      }
    );

    if (!file) {
      return;
    }

    const allowedTypes =
      new Set([
        "video/mp4",
        "video/quicktime",
        "video/webm",
      ]);

    if (
      !allowedTypes.has(
        file.type
      )
    ) {
      input.value = "";

      setFileErrors(
        (current) => ({
          ...current,
          [input.id]:
            "Format video harus MP4, MOV, atau WEBM.",
        })
      );

      return;
    }

    if (
      file.size <= 0
    ) {
      input.value = "";

      setFileErrors(
        (current) => ({
          ...current,
          [input.id]:
            "File video tidak valid atau kosong.",
        })
      );

      return;
    }

    if (
      file.size >
      MAX_VIDEO_FILE_SIZE
    ) {
      input.value = "";

      setFileErrors(
        (current) => ({
          ...current,
          [input.id]:
            "Ukuran video maksimal 30 MB.",
        })
      );
    }
  };

  /* ========================================
     LOCATION VALIDATION
  ======================================== */

  const validateLocation =
    () => {
      if (!formRef.current) {
        return false;
      }

      const city =
        formRef.current.elements.namedItem(
          "city"
        );

      const district =
        formRef.current.elements.namedItem(
          "district"
        );

      const village =
        formRef.current.elements.namedItem(
          "village"
        );

      const address =
        formRef.current.elements.namedItem(
          "address"
        );

      if (
        city instanceof
          HTMLSelectElement &&
        !city.checkValidity()
      ) {
        city.reportValidity();
        scrollToElement(city);

        return false;
      }

      if (
        district instanceof
        HTMLInputElement
      ) {
        const value =
          normalizeText(
            district.value
          );

        if (
          value.length < 2 ||
          value.length > 100
        ) {
          setFieldError(
            district,
            "Kecamatan minimal 2 karakter dan maksimal 100 karakter."
          );

          return false;
        }
      }

      if (
        village instanceof
        HTMLInputElement
      ) {
        const value =
          normalizeText(
            village.value
          );

        if (
          value.length < 2 ||
          value.length > 100
        ) {
          setFieldError(
            village,
            "Desa / Kelurahan minimal 2 karakter dan maksimal 100 karakter."
          );

          return false;
        }
      }

      if (
        address instanceof
        HTMLTextAreaElement
      ) {
        const value =
          normalizeText(
            address.value
          );

        if (!value) {
          setFieldError(
            address,
            "Alamat lengkap wajib diisi."
          );

          return false;
        }

        if (
          value.length >
          1000
        ) {
          setFieldError(
            address,
            "Alamat lengkap maksimal 1000 karakter."
          );

          return false;
        }
      }

      return true;
    };

  /* ========================================
   PRODUCT VALIDATION
======================================== */

const validateProduct = (
  index: number
) => {
  if (!formRef.current) {
    return false;
  }

  const item =
    commodities[index];

  if (!item) {
    return false;
  }

  const requiredNames = [
  `products[${index}][commodity]`,
  `products[${index}][productForm]`,
  `products[${index}][stock]`,
  `products[${index}][monthlyCapacity]`,
  `products[${index}][price]`,
  `products[${index}][specification]`,
  `products[${index}][productPhoto]`,
  `products[${index}][stockPhoto]`,
  `products[${index}][productVideo]`,
];

  for (
    const name of
    requiredNames
  ) {
    const field =
      formRef.current.elements.namedItem(
        name
      );

    if (
      field instanceof
        HTMLInputElement ||
      field instanceof
        HTMLSelectElement ||
      field instanceof
        HTMLTextAreaElement
    ) {
      if (
        !field.checkValidity()
      ) {
        field.reportValidity();

        scrollToElement(
          field
        );

        return false;
      }

      if (
        field instanceof
          HTMLInputElement &&
        field.dataset
          .numeric ===
          "true"
      ) {
        const digits =
          onlyDigits(
            field.value
          );

        const numericValue =
          Number(digits);

        if (
          !digits ||
          !Number.isSafeInteger(
            numericValue
          ) ||
          numericValue <= 0
        ) {
          setFieldError(
            field,
            "Masukkan angka lebih dari 0."
          );

          return false;
        }
      }
    }
  }

  const minimumOrder =
    formRef.current.elements.namedItem(
      `products[${index}][minimumOrder]`
    );

  if (
    minimumOrder instanceof
      HTMLInputElement &&
    minimumOrder.value.trim()
  ) {
    const digits =
      onlyDigits(
        minimumOrder.value
      );

    const numericValue =
      Number(digits);

    if (
      !digits ||
      !Number.isSafeInteger(
        numericValue
      ) ||
      numericValue <= 0
    ) {
      setFieldError(
        minimumOrder,
        "Masukkan angka lebih dari 0 atau kosongkan field ini."
      );

      return false;
    }
  }

  const specification =
    formRef.current.elements.namedItem(
      `products[${index}][specification]`
    );

  if (
    specification instanceof
    HTMLTextAreaElement
  ) {
    const value =
      normalizeText(
        specification.value
      );

    if (
      countWords(value) <
      MIN_SPECIFICATION_WORDS
    ) {
      setFieldError(
        specification,
        `Spesifikasi / keterangan produk minimal ${MIN_SPECIFICATION_WORDS} kata.`
      );

      return false;
    }

    if (
      value.length >
      3000
    ) {
      setFieldError(
        specification,
        "Spesifikasi / keterangan produk maksimal 3000 karakter."
      );

      return false;
    }
  }

  if (
    item.certifications.length === 0
  ) {
    const certificationField =
      document.getElementById(
        `certification-${item.id}`
      );

    setProductError(
      `Pilih status sertifikasi Produk ${index + 1}. Jika belum memiliki sertifikasi, pilih "Belum Memiliki Sertifikasi".`
    );

    if (
      certificationField instanceof
      HTMLElement
    ) {
      scrollToElement(
        certificationField
      );
    }

    return false;
  }

  if (
    item.certifications.includes(
      "belum-ada"
    ) &&
    item.certifications.length > 1
  ) {
    const certificationField =
      document.getElementById(
        `certification-${item.id}`
      );

    setProductError(
      `"Belum Memiliki Sertifikasi" tidak dapat dipilih bersama sertifikasi lain pada Produk ${index + 1}.`
    );

    if (
      certificationField instanceof
      HTMLElement
    ) {
      scrollToElement(
        certificationField
      );
    }

    return false;
  }

  if (
    item.certifications.includes(
      "lainnya"
    )
  ) {
    const otherField =
      document.getElementById(
        `otherCertification-${item.id}`
      );

    if (
      otherField instanceof
      HTMLInputElement
    ) {
      const value =
        normalizeText(
          item.otherCertification
        );

      if (!value) {
        setFieldError(
          otherField,
          "Masukkan nama sertifikasi lainnya."
        );

        return false;
      }

      if (
        value.length >
        200
      ) {
        setFieldError(
          otherField,
          "Nama sertifikasi maksimal 200 karakter."
        );

        return false;
      }
    }
  }

  const sampleFields =
    formRef.current.querySelectorAll<HTMLInputElement>(
      `input[name="products[${index}][sampleAvailable]"]`
    );

  const sampleSelected =
    Array.from(
      sampleFields
    ).some(
      (field) =>
        field.checked
    );

  if (!sampleSelected) {
    const firstRadio =
      sampleFields[0];

    if (firstRadio) {
      firstRadio.reportValidity();

      scrollToElement(
        firstRadio
      );
    }

    return false;
  }

  return true;
};

  /* ========================================
     ADD / REMOVE COMMODITY
  ======================================== */

  const addCommodity =
    () => {
      setProductError("");

      if (
        commodities.length >=
        safeMaxCommodities
      ) {
        setProductError(
          `Maksimal ${safeMaxCommodities} produk dalam satu pendaftaran.`
        );

        return;
      }

      const lastIndex =
        commodities.length - 1;

      if (
        !validateProduct(
          lastIndex
        )
      ) {
        setProductError(
          `Lengkapi informasi Produk ${commodities.length} terlebih dahulu sebelum menambahkan produk berikutnya.`
        );

        return;
      }

      const duplicateIndex =
        findDuplicateProductIndex(
          commodities
        );

      if (
        duplicateIndex !== -1
      ) {
        setProductError(
          "Produk dengan komoditas dan bentuk yang sama sudah ditambahkan sebelumnya."
        );

        const duplicateItem =
          commodities[
            duplicateIndex
          ];

        if (duplicateItem) {
          const field =
            document.getElementById(
              `productForm-${duplicateItem.id}`
            );

          if (
            field instanceof
            HTMLSelectElement
          ) {
            scrollToElement(
              field
            );
          }
        }

        return;
      }

      setCommodities(
        (current) => [
          ...current,
          createCommodity(
            Date.now()
          ),
        ]
      );

      window.setTimeout(
        () => {
          const productCards =
            document.querySelectorAll(
              ".supplier-product-card"
            );

          const lastCard =
            productCards[
              productCards.length -
                1
            ];

          if (
            lastCard instanceof
            HTMLElement
          ) {
            lastCard.scrollIntoView(
              {
                behavior:
                  "smooth",
                block: "start",
              }
            );
          }
        },
        100
      );
    };

  const removeCommodity = (
    id: number
  ) => {
    if (
      commodities.length <= 1
    ) {
      return;
    }

    setCommodities(
      (current) =>
        current.filter(
          (item) =>
            item.id !== id
        )
    );

    setProductError("");
    setFormError("");

    setFileErrors(
      (current) => {
        const next = {
          ...current,
        };

        delete next[
          `productPhoto-${id}`
        ];

        delete next[
          `stockPhoto-${id}`
        ];

        delete next[
          `productVideo-${id}`
        ];

        return next;
      }
    );
  };

  /* ========================================
     FULL FORM VALIDATION
  ======================================== */

  const validateFullForm =
    () => {
      if (!formRef.current) {
        return false;
      }

      setFormError("");
      setProductError("");

      if (
        commodities.length >
        safeMaxCommodities
      ) {
        setFormError(
          `Jumlah produk melebihi batas maksimal ${safeMaxCommodities}.`
        );

        return false;
      }

      if (
        !validateLocation()
      ) {
        setFormError(
          "Mohon periksa kembali informasi lokasi supplier."
        );

        return false;
      }

      for (
        let index = 0;
        index <
        commodities.length;
        index += 1
      ) {
        if (
          !validateProduct(
            index
          )
        ) {
          setFormError(
            `Mohon periksa kembali informasi Produk ${
              index + 1
            }.`
          );

          return false;
        }
      }

      const duplicateIndex =
        findDuplicateProductIndex(
          commodities
        );

      if (
        duplicateIndex !== -1
      ) {
        const duplicateItem =
          commodities[
            duplicateIndex
          ];

        setFormError(
          "Produk dengan komoditas dan bentuk yang sama sudah ditambahkan sebelumnya."
        );

        setProductError(
          "Pilih bentuk produk yang berbeda untuk komoditas yang sama."
        );

        if (duplicateItem) {
          const field =
            document.getElementById(
              `productForm-${duplicateItem.id}`
            );

          if (
            field instanceof
            HTMLSelectElement
          ) {
            setFieldError(
              field,
              "Produk dengan komoditas dan bentuk yang sama sudah ditambahkan sebelumnya."
            );
          }
        }

        return false;
      }

      const confirmation =
        formRef.current.elements.namedItem(
          "confirmation"
        );

      if (
        confirmation instanceof
          HTMLInputElement &&
        !confirmation.checked
      ) {
        confirmation.reportValidity();

        setFormError(
          "Mohon centang pernyataan konfirmasi sebelum mengirim pendaftaran."
        );

        scrollToElement(
          confirmation
        );

        return false;
      }

      if (
        !formRef.current.checkValidity()
      ) {
        const invalidField =
          formRef.current.querySelector<
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
          >(":invalid");

        if (invalidField) {
          invalidField.reportValidity();

          scrollToElement(
            invalidField
          );
        }

        setFormError(
          "Mohon periksa kembali. Masih ada data wajib yang belum lengkap atau belum sesuai."
        );

        return false;
      }

      return true;
    };

  /* ========================================
     SUBMIT
  ======================================== */

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!stepOnePassed) {
      if (
        !validateStepOne()
      ) {
        return;
      }

      setStepOneError(
        "Silakan klik Cek & Lanjut terlebih dahulu."
      );

      return;
    }

    if (
      !validateFullForm()
    ) {
      return;
    }

    setShowConfirmation(
      true
    );
  };

    /* ========================================
     FINAL SUBMIT
  ======================================== */

  const handleFinalSubmit =
    async () => {
      if (
        !formRef.current ||
        isSubmitting
      ) {
        return;
      }

      if (
        !validateFullForm()
      ) {
        setShowConfirmation(
          false
        );

        return;
      }

      setIsSubmitting(true);
      setFormError("");

      try {
        const form =
          formRef.current;

        const provinceField =
          form.elements.namedItem(
            "province"
          );

        const cityField =
          form.elements.namedItem(
            "city"
          );

        const districtField =
          form.elements.namedItem(
            "district"
          );

        const villageField =
          form.elements.namedItem(
            "village"
          );

        const addressField =
          form.elements.namedItem(
            "address"
          );

        if (
          !(
            provinceField instanceof
            HTMLInputElement
          ) ||
          !(
            cityField instanceof
            HTMLSelectElement
          ) ||
          !(
            districtField instanceof
            HTMLInputElement
          ) ||
          !(
            villageField instanceof
            HTMLInputElement
          ) ||
          !(
            addressField instanceof
            HTMLTextAreaElement
          )
        ) {
          throw new Error(
            "Data lokasi tidak dapat dibaca."
          );
        }

        const collectedProducts: {
          commodity: CommodityName;
          productForm: string;
          currentStockKg: string;
          monthlyCapacityKg: string;
          minimumOrderKg: string;
          offerPriceIdrKg: string;
          specification: string;
          certifications: CertificationName[];
          otherCertification: string;
          sampleAvailable: string;
          productPhoto: File;
          stockPhoto: File;
          productVideo: File;
        }[] = [];

        for (
          let index = 0;
          index <
          commodities.length;
          index += 1
        ) {
          const item =
            commodities[index];

          if (!item) {
            throw new Error(
              `Data Produk ${
                index + 1
              } tidak ditemukan.`
            );
          }

          const prefix =
            `products[${index}]`;

          const stockField =
            form.elements.namedItem(
              `${prefix}[stock]`
            );

          const capacityField =
            form.elements.namedItem(
              `${prefix}[monthlyCapacity]`
            );

          const minimumOrderField =
            form.elements.namedItem(
              `${prefix}[minimumOrder]`
            );

          const priceField =
            form.elements.namedItem(
              `${prefix}[price]`
            );

          const specificationField =
            form.elements.namedItem(
              `${prefix}[specification]`
            );

          const productPhotoField =
            form.elements.namedItem(
              `${prefix}[productPhoto]`
            );

          const stockPhotoField =
            form.elements.namedItem(
              `${prefix}[stockPhoto]`
            );

          const productVideoField =
            form.elements.namedItem(
              `${prefix}[productVideo]`
            );

          const sampleField =
            form.querySelector<HTMLInputElement>(
              `input[name="${prefix}[sampleAvailable]"]:checked`
            );

          if (
            !(
              stockField instanceof
              HTMLInputElement
            ) ||
            !(
              capacityField instanceof
              HTMLInputElement
            ) ||
            !(
              minimumOrderField instanceof
              HTMLInputElement
            ) ||
            !(
              priceField instanceof
              HTMLInputElement
            ) ||
            !(
              specificationField instanceof
              HTMLTextAreaElement
            ) ||
            !(
              productPhotoField instanceof
              HTMLInputElement
            ) ||
            !(
              stockPhotoField instanceof
              HTMLInputElement
            ) ||
            !(
              productVideoField instanceof
              HTMLInputElement
            )
          ) {
            throw new Error(
              `Data Produk ${
                index + 1
              } tidak dapat dibaca.`
            );
          }

          const productPhoto =
            productPhotoField
              .files?.[0];

          const stockPhoto =
            stockPhotoField
              .files?.[0];

          const productVideo =
            productVideoField
              .files?.[0];

          if (
            !productPhoto ||
            !stockPhoto
          ) {
            throw new Error(
              `Foto Produk ${
                index + 1
              } belum lengkap.`
            );
          }

          if (!productVideo) {
            throw new Error(
              `Video detail Produk ${
                index + 1
              } belum tersedia.`
            );
          }

          if (!sampleField) {
            throw new Error(
              `Pilihan sampel Produk ${
                index + 1
              } belum diisi.`
            );
          }

          collectedProducts.push({
            commodity:
              item.commodity,
            productForm:
              item.productForm,
            currentStockKg:
              onlyDigits(
                stockField.value
              ),
            monthlyCapacityKg:
              onlyDigits(
                capacityField.value
              ),
            minimumOrderKg:
              onlyDigits(
                minimumOrderField.value
              ),
            offerPriceIdrKg:
              onlyDigits(
                priceField.value
              ),
            specification:
              normalizeText(
                specificationField.value
              ),
            certifications:
              item.certifications,
            otherCertification:
              normalizeText(
                item.otherCertification
              ),
            sampleAvailable:
              sampleField.value,
            productPhoto,
            stockPhoto,
            productVideo,
          });
        }

        const prepareResponse =
          await fetch(
            "/api/supplier-registration/prepare",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify({
                products:
                  collectedProducts.map(
                    (
                      product,
                      index
                    ) => ({
                      productNumber:
                        index + 1,
                      media: [
                        {
                          mediaType:
                            "productPhoto",
                          mimeType:
                            product.productPhoto.type,
                          fileSize:
                            product.productPhoto.size,
                        },
                        {
                          mediaType:
                            "stockPhoto",
                          mimeType:
                            product.stockPhoto.type,
                          fileSize:
                            product.stockPhoto.size,
                        },
                        {
                          mediaType:
                            "productVideo",
                          mimeType:
                            product.productVideo.type,
                          fileSize:
                            product.productVideo.size,
                        },
                      ],
                    })
                  ),
              }),
            }
          );

        let prepareData:
          PrepareResponse;

        try {
          prepareData =
            (await prepareResponse.json()) as PrepareResponse;
        } catch {
          throw new Error(
            "Server tidak dapat menyiapkan upload media."
          );
        }

        if (
          !prepareResponse.ok ||
          !prepareData.success ||
          !prepareData.registrationToken ||
          !Array.isArray(
            prepareData.products
          ) ||
          prepareData.products.length !==
            collectedProducts.length
        ) {
          throw new Error(
            prepareData.message ||
              "Upload media tidak dapat disiapkan."
          );
        }

        const products = [];

        for (
          let index = 0;
          index <
          collectedProducts.length;
          index += 1
        ) {
          const product =
            collectedProducts[index];

          const preparedProduct =
            prepareData.products[index];

          if (
            !product ||
            !preparedProduct ||
            preparedProduct.productNumber !==
              index + 1 ||
            !Array.isArray(
              preparedProduct.media
            )
          ) {
            throw new Error(
              `Data upload Produk ${
                index + 1
              } tidak sesuai.`
            );
          }

          const getPreparedMedia = (
            mediaType:
              | "productPhoto"
              | "stockPhoto"
              | "productVideo"
          ) => {
            const preparedMedia =
              preparedProduct.media?.find(
                (media) =>
                  media.mediaType ===
                  mediaType
              );

            if (
              !preparedMedia?.uploadUrl
            ) {
              throw new Error(
                `Upload ${mediaType} Produk ${
                  index + 1
                } tidak tersedia.`
              );
            }

            return preparedMedia;
          };

          const productPhotoPrepared =
            getPreparedMedia(
              "productPhoto"
            );

          const stockPhotoPrepared =
            getPreparedMedia(
              "stockPhoto"
            );

          const productVideoPrepared =
            getPreparedMedia(
              "productVideo"
            );

          await uploadPreparedFile(
            product.productPhoto,
            productPhotoPrepared.uploadUrl!
          );

          await uploadPreparedFile(
            product.stockPhoto,
            stockPhotoPrepared.uploadUrl!
          );

          await uploadPreparedFile(
            product.productVideo,
            productVideoPrepared.uploadUrl!
          );

          products.push({
            commodity:
              product.commodity,
            productForm:
              product.productForm,
            currentStockKg:
              product.currentStockKg,
            monthlyCapacityKg:
              product.monthlyCapacityKg,
            minimumOrderKg:
              product.minimumOrderKg,
            offerPriceIdrKg:
              product.offerPriceIdrKg,
            specification:
              product.specification,
            certifications:
              product.certifications,
            otherCertification:
              product.otherCertification,
            sampleAvailable:
              product.sampleAvailable,
          });
        }

        const confirmationField =
          form.elements.namedItem(
            "confirmation"
          );

        if (
          !(
            confirmationField instanceof
            HTMLInputElement
          ) ||
          !confirmationField.checked
        ) {
          throw new Error(
            "Pernyataan konfirmasi belum disetujui."
          );
        }

        const payload = {
          registrationToken:
            prepareData.registrationToken,
          fullName:
            normalizeText(
              stepOneData.supplierName
            ),
          businessName:
            normalizeText(
              stepOneData.businessName
            ),
          whatsapp:
            getFullWhatsApp(),
          email:
            stepOneData.email.trim(),
          supplierType:
            stepOneData.supplierType,
          province:
            provinceField.value.trim(),
          regency:
            cityField.value.trim(),
          district:
            normalizeText(
              districtField.value
            ),
          village:
            normalizeText(
              villageField.value
            ),
          fullAddress:
            normalizeText(
              addressField.value
            ),
          productCount:
            products.length,
          products,
          declaration: true,
          website:
            honeypot,
        };

        const response =
          await fetch(
            "/api/supplier-registration/submit",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body:
                JSON.stringify(
                  payload
                ),
            }
          );

        let data: SubmitResponse;

        try {
          data =
            (await response.json()) as SubmitResponse;
        } catch {
          throw new Error(
            "Server memberikan respons yang tidak valid."
          );
        }

        if (
          !response.ok ||
          !data.success
        ) {
          setShowConfirmation(
            false
          );

          setFormError(
            data.message ||
              "Pendaftaran belum berhasil dikirim."
          );

          window.setTimeout(
            () => {
              document
                .querySelector(
                  ".supplier-form-message-error"
                )
                ?.scrollIntoView({
                  behavior:
                    "smooth",
                  block:
                    "center",
                });
            },
            100
          );

          return;
        }

        setShowConfirmation(
          false
        );

        router.push(
          "/supplier-registration/thank-you"
        );
      } catch (error) {
        console.error(
          "Supplier registration error:",
          error
        );

        setShowConfirmation(
          false
        );

        setFormError(
          error instanceof Error
            ? error.message
            : "Pendaftaran belum berhasil dikirim. Silakan coba kembali."
        );

        window.setTimeout(
          () => {
            document
              .querySelector(
                ".supplier-form-message-error"
              )
              ?.scrollIntoView({
                behavior:
                  "smooth",
                block:
                  "center",
              });
          },
          100
        );
      } finally {
        setIsSubmitting(
          false
        );
      }
    };

  /* ========================================
     RENDER
  ======================================== */

  return (
    <>
      <form
        ref={formRef}
        className="supplier-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
          }}
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            type="text"
            id="website"
            name="website"
            value={honeypot}
            onChange={(event) =>
              setHoneypot(
                event.target.value
              )
            }
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* ========================================
            01 INFORMASI SUPPLIER
        ======================================== */}

        <section
          className="supplier-form-section"
          id="supplier-information-section"
        >
          <div className="supplier-section-heading">
            <span>01</span>

            <div>
              <h3>
                Informasi Supplier
              </h3>

              <p>
                Masukkan informasi dasar terlebih
                dahulu untuk melanjutkan
                pendaftaran.
              </p>
            </div>
          </div>

          <div className="supplier-fields">
            <div className="supplier-field">
              <label htmlFor="supplierName">
                Nama Lengkap
                <span className="required">
                  *
                </span>
              </label>

              <input
                type="text"
                id="supplierName"
                name="supplierName"
                placeholder="Masukkan nama lengkap"
                autoComplete="name"
                minLength={2}
                maxLength={150}
                value={
                  stepOneData.supplierName
                }
                onChange={
                  handleStepOneInputChange
                }
                readOnly={
                  stepOnePassed
                }
                required
              />
            </div>

            <div className="supplier-field">
              <label htmlFor="businessName">
                Nama Usaha
              </label>

              <input
                type="text"
                id="businessName"
                name="businessName"
                placeholder="Jika memiliki nama usaha"
                autoComplete="organization"
                maxLength={200}
                value={
                  stepOneData.businessName
                }
                onChange={
                  handleStepOneInputChange
                }
                readOnly={
                  stepOnePassed
                }
              />

              <small>
                Opsional jika mendaftar sebagai
                perorangan atau petani.
              </small>
            </div>

            <div className="supplier-field">
              <label htmlFor="whatsapp">
                Nomor WhatsApp
                <span className="required">
                  *
                </span>
              </label>

              <div className="supplier-input-unit">
                <span>
                  +62
                </span>

                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="81234567890"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="^8[0-9]{7,11}$"
                  minLength={8}
                  maxLength={12}
                  value={
                    stepOneData.whatsapp
                  }
                  onChange={
                    handleWhatsAppChange
                  }
                  readOnly={
                    stepOnePassed
                  }
                  required
                />
              </div>

              <small>
                Masukkan nomor mulai dari angka
                8. Kode negara +62 sudah
                tersedia.
              </small>

              {whatsappNotice && (
                <small className="supplier-field-error">
                  {whatsappNotice}
                </small>
              )}
            </div>

            <div className="supplier-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="contoh@email.com"
                autoComplete="email"
                maxLength={254}
                value={
                  stepOneData.email
                }
                onChange={
                  handleStepOneInputChange
                }
                readOnly={
                  stepOnePassed
                }
              />

              <small>
                Opsional.
              </small>
            </div>

            <div className="supplier-field supplier-field-full">
              <label htmlFor="supplierType">
                Jenis Supplier
                <span className="required">
                  *
                </span>
              </label>

              <select
                id="supplierType"
                name="supplierType"
                value={
                  stepOneData.supplierType
                }
                onChange={
                  handleStepOneInputChange
                }
                disabled={
                  stepOnePassed
                }
                required
              >
                <option
                  value=""
                  disabled
                >
                  Pilih Jenis Supplier
                </option>

                <option value="petani">
                  Petani
                </option>

                <option value="produsen-pengolah">
                  Produsen / Pengolah
                </option>

                <option value="pengepul">
                  Pengepul
                </option>

                <option value="distributor">
                  Distributor
                </option>
              </select>
            </div>
          </div>

          {stepOneError && (
            <div
              className="supplier-form-message supplier-form-message-error"
              role="alert"
            >
              {stepOneError}
            </div>
          )}

          <div className="supplier-step-actions">
            {!stepOnePassed ? (
              <button
                type="button"
                className="supplier-submit"
                onClick={
                  handleStepOneContinue
                }
                disabled={
                  isCheckingStepOne
                }
              >
                {isCheckingStepOne
                  ? "Memeriksa..."
                  : "Cek & Lanjut"}
              </button>
            ) : (
              <>
                <div className="supplier-form-message supplier-form-message-success">
                  Informasi supplier berhasil
                  diperiksa. Silakan lanjutkan
                  pendaftaran.
                </div>

                <button
                  type="button"
                  className="supplier-secondary-button"
                  onClick={
                    handleEditStepOne
                  }
                >
                  Ubah Informasi Supplier
                </button>
              </>
            )}
          </div>
        </section>

        {stepOnePassed && (
          <>
            {/* ========================================
    02 LOKASI
======================================== */}

<section
  className="supplier-form-section"
  id="supplier-location-section"
>
  <div className="supplier-section-heading">
    <span>02</span>

    <div>
      <h3>Lokasi Produk / Sumber Pasokan</h3>
      <p>
        Masukkan lokasi utama tempat produk atau stok yang ditawarkan tersedia.
      </p>
    </div>
  </div>

  <div className="supplier-fields">
    <div className="supplier-field">
      <label htmlFor="province">
        Provinsi
        <span className="required">*</span>
      </label>

      <input
        type="text"
        id="province"
        name="province"
        value="Jawa Timur"
        readOnly
      />
    </div>

    <div className="supplier-field">
      <label htmlFor="city">
        Kabupaten / Kota
        <span className="required">*</span>
      </label>

      <select
        id="city"
        name="city"
        defaultValue=""
        required
      >
        <option value="" disabled>
          Pilih Kabupaten / Kota
        </option>
        <option value="Kabupaten Ponorogo">
          Kabupaten Ponorogo
        </option>
        <option value="Kabupaten Madiun">
          Kabupaten Madiun
        </option>
        <option value="Kota Madiun">
          Kota Madiun
        </option>
        <option value="Kabupaten Magetan">
          Kabupaten Magetan
        </option>
      </select>
    </div>

    <div className="supplier-field">
      <label htmlFor="district">
        Kecamatan
        <span className="required">*</span>
      </label>

      <input
        type="text"
        id="district"
        name="district"
        placeholder="Contoh: Jenangan"
        autoComplete="address-level3"
        minLength={2}
        maxLength={100}
        required
      />
    </div>

    <div className="supplier-field">
      <label htmlFor="village">
        Desa / Kelurahan
        <span className="required">*</span>
      </label>

      <input
        type="text"
        id="village"
        name="village"
        placeholder="Contoh: Plalangan"
        minLength={2}
        maxLength={100}
        required
      />
    </div>

    <div className="supplier-field supplier-field-full">
      <label htmlFor="address">
        Alamat Lengkap
        <span className="required">*</span>
      </label>

      <textarea
        id="address"
        name="address"
        placeholder="Contoh: Jl. Raya Jenangan No. 10, RT 02/RW 01, Dusun Krajan"
        autoComplete="street-address"
        rows={4}
        maxLength={1000}
        required
      />

      <small>
        Tuliskan detail jalan, nomor rumah, RT/RW, dusun, atau patokan lokasi jika tersedia.
      </small>
    </div>
  </div>
</section>

            {/* ========================================
                03 PRODUK
            ======================================== */}

            <section className="supplier-form-section">
              <div className="supplier-section-heading">
                <span>03</span>

                <div>
                  <h3>
                    Produk yang Ditawarkan
                  </h3>

                  <p>
                    Tambahkan informasi produk,
                    ketersediaan, harga, dan
                    kondisi produk yang Anda
                    tawarkan.
                  </p>
                </div>
              </div>

              <div className="supplier-products">
                {commodities.map(
                  (
                    item,
                    index
                  ) => {
                    const options =
                      item.commodity
                        ? productFormOptions[
                            item
                              .commodity
                          ] ??
                          []
                        : [];

                    const hasNoCertification =
                      item.certifications.includes(
                        "belum-ada"
                      );

                    return (
                      <div
                        className="supplier-product-card"
                        key={
                          item.id
                        }
                      >
                        <div className="supplier-product-header">
                          <div>
                            <span className="supplier-product-number">
                              Produk{" "}
                              {index +
                                1}
                            </span>

                            <h4>
                              Informasi
                              Produk
                            </h4>
                          </div>

                          {commodities.length >
                            1 && (
                            <button
                              type="button"
                              className="supplier-remove-product"
                              onClick={() =>
                                removeCommodity(
                                  item.id
                                )
                              }
                            >
                              Hapus
                            </button>
                          )}
                        </div>

                        <div className="supplier-fields">
                          <div className="supplier-field">
                            <label
                              htmlFor={`commodity-${item.id}`}
                            >
                              Komoditas
                              <span className="required">
                                *
                              </span>
                            </label>

                            <select
                              id={`commodity-${item.id}`}
                              name={`products[${index}][commodity]`}
                              value={
                                item.commodity
                              }
                              onChange={(
                                event
                              ) =>
                                handleCommodityChange(
                                  item.id,
                                  event
                                )
                              }
                              required
                            >
                              <option
                                value=""
                                disabled
                              >
                                Pilih
                                Komoditas
                              </option>

                              <option value="kunyit">
                                Kunyit
                              </option>
                              <option value="laos">
                              Laos
                            </option>
                            </select>

                            <small>
                              Saat ini pendaftaran supplier
                              dibuka untuk komoditas kunyit
                              dan laos.
                            </small>
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`productForm-${item.id}`}
                            >
                              Bentuk Produk
                              <span className="required">
                                *
                              </span>
                            </label>

                            <select
                              id={`productForm-${item.id}`}
                              name={`products[${index}][productForm]`}
                              value={
                                item.productForm
                              }
                              onChange={(
                                event
                              ) =>
                                handleProductFormChange(
                                  item.id,
                                  event
                                )
                              }
                              disabled={
                                !item.commodity
                              }
                              required
                            >
                              <option
                                value=""
                                disabled
                              >
                                {item.commodity
                                  ? "Pilih Bentuk Produk"
                                  : "Pilih Komoditas Terlebih Dahulu"}
                              </option>

                              {options.map(
                                (
                                  option
                                ) => {
                                  const alreadyUsed =
                                    commodities.some(
                                      (
                                        otherItem
                                      ) =>
                                        otherItem.id !==
                                          item.id &&
                                        otherItem.commodity ===
                                          item.commodity &&
                                        otherItem.productForm ===
                                          option.value
                                    );

                                  return (
                                    <option
                                      key={
                                        option.value
                                      }
                                      value={
                                        option.value
                                      }
                                      disabled={
                                        alreadyUsed
                                      }
                                    >
                                      {
                                        option.label
                                      }
                                      {alreadyUsed
                                        ? " (sudah ditambahkan)"
                                        : ""}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`stock-${item.id}`}
                            >
                              Stok Tersedia Saat Ini
                              <span className="required">
                                *
                              </span>
                            </label>

                            <div className="supplier-input-unit">
                              <input
                                type="text"
                                id={`stock-${item.id}`}
                                name={`products[${index}][stock]`}
                                placeholder="Contoh: 1.000"
                                inputMode="numeric"
                                data-numeric="true"
                                onChange={
                                  handleFormattedNumberChange
                                }
                                required
                              />

                              <span>
                                kg
                              </span>
                            </div>
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`capacity-${item.id}`}
                            >
                              Kapasitas
                              Pasokan per
                              Bulan
                              <span className="required">
                                *
                              </span>
                            </label>

                            <div className="supplier-input-unit">
                              <input
                                type="text"
                                id={`capacity-${item.id}`}
                                name={`products[${index}][monthlyCapacity]`}
                                placeholder="Contoh: 5.000"
                                inputMode="numeric"
                                data-numeric="true"
                                onChange={
                                  handleFormattedNumberChange
                                }
                                required
                              />

                              <span>
                                kg/bulan
                              </span>
                            </div>
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`minimumOrder-${item.id}`}
                            >
                              Minimum
                              Pemesanan
                            </label>

                            <div className="supplier-input-unit">
                              <input
                                type="text"
                                id={`minimumOrder-${item.id}`}
                                name={`products[${index}][minimumOrder]`}
                                placeholder="Contoh: 500"
                                inputMode="numeric"
                                data-numeric="true"
                                onChange={
                                  handleFormattedNumberChange
                                }
                              />

                              <span>
                                kg
                              </span>
                            </div>

                            <small>
                              Kosongkan jika
                              tidak memiliki
                              minimum
                              pemesanan.
                            </small>
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`price-${item.id}`}
                            >
                              Harga Penawaran Saat Ini
                              <span className="required">
                                *
                              </span>
                            </label>

                            <div className="supplier-input-unit supplier-price-input">
                              <span>
                                Rp
                              </span>

                              <input
                                type="text"
                                id={`price-${item.id}`}
                                name={`products[${index}][price]`}
                                placeholder="Contoh: 25.000"
                                inputMode="numeric"
                                data-numeric="true"
                                onChange={
                                  handleFormattedNumberChange
                                }
                                required
                              />

                              <span>
                                /kg
                              </span>
                            </div>

                            <small>
                              Masukkan harga penawaran per kg saat ini.
                            </small>
                          </div>

                          <div className="supplier-field supplier-field-full">
                            <label
                              htmlFor={`specification-${item.id}`}
                            >
                              Spesifikasi /
                              Keterangan
                              Produk
                              <span className="required">
                                *
                              </span>
                            </label>

                            <textarea
                              id={`specification-${item.id}`}
                              name={`products[${index}][specification]`}
                              placeholder="Contoh: Ash 2%, kadar air 10%, umur panen 8 bulan, atau informasi produk lainnya."
                              rows={4}
                              maxLength={3000}
                              required
                            />

                            <small>
                              Minimal 2 kata. Isi spesifikasi atau keterangan produk sesuai informasi yang Anda ketahui.
                            </small>
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`productPhoto-${item.id}`}
                            >
                              Foto Produk
                              Jarak Dekat
                              <span className="required">
                                *
                              </span>
                            </label>

                            <input
                              type="file"
                              id={`productPhoto-${item.id}`}
                              name={`products[${index}][productPhoto]`}
                              accept="image/jpeg,image/png,image/webp"
                              onChange={
                                handleFileChange
                              }
                              required
                            />

                            <small>
                              JPG, PNG, atau
                              WEBP. Maksimal
                              5 MB.
                            </small>

                            {fileErrors[
                              `productPhoto-${item.id}`
                            ] && (
                              <small className="supplier-field-error">
                                {
                                  fileErrors[
                                    `productPhoto-${item.id}`
                                  ]
                                }
                              </small>
                            )}
                          </div>

                          <div className="supplier-field">
                            <label
                              htmlFor={`stockPhoto-${item.id}`}
                            >
                              Foto Stok
                              Produk
                              <span className="required">
                                *
                              </span>
                            </label>

                            <input
                              type="file"
                              id={`stockPhoto-${item.id}`}
                              name={`products[${index}][stockPhoto]`}
                              accept="image/jpeg,image/png,image/webp"
                              onChange={
                                handleFileChange
                              }
                              required
                            />

                            <small>
                              Unggah foto yang memperlihatkan stok atau jumlah produk yang tersedia. JPG, PNG, atau WEBP. Maksimal 5 MB.
                            </small>

                            {fileErrors[
                              `stockPhoto-${item.id}`
                            ] && (
                              <small className="supplier-field-error">
                                {
                                  fileErrors[
                                    `stockPhoto-${item.id}`
                                  ]
                                }
                              </small>
                            )}
                          </div>

                          <div className="supplier-field supplier-field-full">
                          <label
                            htmlFor={`productVideo-${item.id}`}
                          >
                            Video Detail Produk
                            <span className="required">
                              *
                            </span>
                          </label>

                          <input
                            type="file"
                            id={`productVideo-${item.id}`}
                            name={`products[${index}][productVideo]`}
                            accept="video/mp4,video/quicktime,video/webm"
                            onChange={
                              handleVideoChange
                            }
                            required
                          />

                          <small>
                          Rekam produk yang ditawarkan dari jarak dekat
                          dengan pencahayaan yang cukup. Pastikan bentuk,
                          warna, tekstur, dan kondisi produk terlihat jelas
                          dari beberapa sisi. Gunakan video asli tanpa
                          filter, durasi 10–30 detik. Format MP4, MOV,
                          atau WEBM. Maksimal 30 MB.
                        </small>

                          {fileErrors[
                            `productVideo-${item.id}`
                          ] && (
                            <small className="supplier-field-error">
                              {
                                fileErrors[
                                  `productVideo-${item.id}`
                                ]
                              }
                            </small>
                          )}
                        </div>

                          <div className="supplier-field supplier-field-full">
                          <fieldset
                            className="supplier-certification-field"
                            id={`certification-${item.id}`}
                          >
                            <legend>
                              Sertifikasi Produk
                              <span className="required">
                                *
                              </span>
                            </legend>

                            <p className="supplier-field-description">
                              Pilih sertifikasi yang dimiliki
                              produk. Jika belum memiliki
                              sertifikasi, pilih "Belum
                              Memiliki Sertifikasi".
                            </p>

                            <div className="supplier-checkbox-grid">
                              {[
                                {
                                  value:
                                    "halal",
                                  label:
                                    "Halal",
                                },
                                {
                                  value:
                                    "organic",
                                  label:
                                    "Organic",
                                },
                                {
                                  value:
                                    "gmp",
                                  label:
                                    "GMP",
                                },
                                {
                                  value:
                                    "haccp",
                                  label:
                                    "HACCP",
                                },
                                {
                                  value:
                                    "lainnya",
                                  label:
                                    "Sertifikasi Lainnya",
                                },
                              ].map(
                                (
                                  certification
                                ) => {
                                  const value =
                                    certification.value as CertificationName;

                                  return (
                                    <label
                                      className="supplier-checkbox-card"
                                      key={
                                        value
                                      }
                                    >
                                      <input
                                        type="checkbox"
                                        name={`products[${index}][certifications]`}
                                        value={
                                          value
                                        }
                                        checked={item.certifications.includes(
                                          value
                                        )}
                                        disabled={
                                          hasNoCertification
                                        }
                                        onChange={(
                                          event
                                        ) =>
                                          handleCertificationChange(
                                            item.id,
                                            value,
                                            event
                                              .target
                                              .checked
                                          )
                                        }
                                      />

                                      <span>
                                        {
                                          certification.label
                                        }
                                      </span>
                                    </label>
                                  );
                                }
                              )}

                              <label className="supplier-checkbox-card">
                                <input
                                  type="checkbox"
                                  name={`products[${index}][certifications]`}
                                  value="belum-ada"
                                  checked={
                                    hasNoCertification
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    handleCertificationChange(
                                      item.id,
                                      "belum-ada",
                                      event
                                        .target
                                        .checked
                                    )
                                  }
                                />

                                <span>
                                  Belum Memiliki
                                  Sertifikasi
                                </span>
                              </label>
                            </div>

                            {item.certifications.includes(
                              "lainnya"
                            ) && (
                              <div className="supplier-other-certification">
                                <label
                                  htmlFor={`otherCertification-${item.id}`}
                                >
                                  Nama Sertifikasi
                                  Lainnya
                                  <span className="required">
                                    *
                                  </span>
                                </label>

                                <input
                                  type="text"
                                  id={`otherCertification-${item.id}`}
                                  name={`products[${index}][otherCertification]`}
                                  value={
                                    item.otherCertification
                                  }
                                  onChange={(
                                    event
                                  ) =>
                                    handleOtherCertificationChange(
                                      item.id,
                                      event
                                        .target
                                        .value
                                    )
                                  }
                                  maxLength={
                                    200
                                  }
                                  placeholder="Contoh: SNI, ISO 22000, atau sertifikasi lainnya"
                                  required
                                />
                              </div>
                            )}

                            <small>
                              Bukti sertifikasi dapat
                              diminta pada tahap
                              verifikasi.
                            </small>
                          </fieldset>
                        </div>

                          <div className="supplier-field supplier-field-full">
                            <fieldset className="supplier-sample-field">
                              <legend>
                                Apakah Anda
                                bersedia
                                menyediakan
                                sampel produk
                                apabila
                                diperlukan?
                                <span className="required">
                                  *
                                </span>
                              </legend>

                              <div className="supplier-radio-group">
                                <label className="supplier-radio-option">
                                  <input
                                    type="radio"
                                    name={`products[${index}][sampleAvailable]`}
                                    value="ya"
                                    required
                                  />

                                  <span>
                                    Ya,
                                    bersedia
                                  </span>
                                </label>

                                <label className="supplier-radio-option">
                                  <input
                                    type="radio"
                                    name={`products[${index}][sampleAvailable]`}
                                    value="tidak"
                                    required
                                  />

                                  <span>
                                    Tidak
                                  </span>
                                </label>
                              </div>
                            </fieldset>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>

              {productError && (
                <div
                  className="supplier-form-message supplier-form-message-error"
                  role="alert"
                >
                  {productError}
                </div>
              )}

              {/* ========================================
                  TAMBAH PRODUK
              ======================================== */}

              {safeMaxCommodities >
                1 &&
                commodities.length <
                  safeMaxCommodities && (
                  <div className="supplier-add-product-wrap">
                    <button
                      type="button"
                      className="supplier-add-product"
                      onClick={
                        addCommodity
                      }
                    >
                      <span aria-hidden="true">
                        +
                      </span>

                      Tambah
                      Produk
                    </button>

                    <small>
                      Maksimal{" "}
                      {
                        safeMaxCommodities
                      }{" "}
                      produk dalam satu pendaftaran. Produk dari komoditas yang sama dapat ditambahkan jika bentuk produknya berbeda, misalnya kunyit segar dan kunyit iris kering.
                    </small>
                  </div>
                )}
            </section>

            {/* ========================================
                04 KONFIRMASI
            ======================================== */}

            <section className="supplier-form-section">
              <div className="supplier-section-heading">
                <span>04</span>

                <div>
                  <h3>
                    Konfirmasi
                  </h3>

                  <p>
                    Periksa kembali seluruh
                    informasi sebelum mengirim
                    pendaftaran.
                  </p>
                </div>
              </div>

              <div className="supplier-confirmation">
                <label className="supplier-checkbox-option">
                  <input
                    type="checkbox"
                    name="confirmation"
                    required
                  />

                  <span>
                    Saya menyatakan bahwa
                    informasi produk, harga,
                    stok, foto, dan data yang
                    saya berikan sesuai dengan
                    kondisi sebenarnya.
                  </span>
                </label>

                <div className="supplier-review-notice">
                  <strong>
                    Informasi Pendaftaran
                  </strong>

                  <p>
                    Pengisian formulir ini tidak otomatis menjadikan pendaftar sebagai supplier PT Dwi Srikandi Bakoh. Setiap pendaftaran akan melalui proses review. Tim kami akan menghubungi Anda apabila produk dan penawaran sesuai dengan kebutuhan pengadaan kami.
                  </p>
                </div>

                {formError && (
                  <div
                    className="supplier-form-message supplier-form-message-error"
                    role="alert"
                  >
                    {formError}
                  </div>
                )}

                <button
                  type="submit"
                  className="supplier-submit"
                  disabled={
                    isSubmitting
                  }
                >
                  Kirim Pendaftaran
                  Supplier
                </button>
              </div>
            </section>
          </>
        )}
      </form>

      {/* ========================================
          CONFIRMATION MODAL
      ======================================== */}

      {showConfirmation && (
        <div
          className="supplier-modal-backdrop"
          role="presentation"
          onMouseDown={(
            event
          ) => {
            if (
              event.target ===
                event.currentTarget &&
              !isSubmitting
            ) {
              setShowConfirmation(
                false
              );
            }
          }}
        >
          <div
            className="supplier-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="supplier-confirmation-title"
          >
            <span className="supplier-modal-label">
              Konfirmasi
            </span>

            <h3 id="supplier-confirmation-title">
              Kirim Pendaftaran
              Supplier?
            </h3>

            <p>
              Pastikan seluruh informasi yang
              Anda masukkan sudah benar. Setelah
              dikirim, data akan masuk ke proses
              review PT Dwi Srikandi Bakoh.
            </p>

            <div className="supplier-modal-actions">
              <button
                type="button"
                className="supplier-secondary-button"
                onClick={() =>
                  setShowConfirmation(
                    false
                  )
                }
                disabled={
                  isSubmitting
                }
              >
                Periksa Kembali
              </button>

              <button
                type="button"
                className="supplier-submit"
                onClick={
                  handleFinalSubmit
                }
                disabled={
                  isSubmitting
                }
              >
                {isSubmitting
                  ? "Mengirim..."
                  : "Ya, Kirim Pendaftaran"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}